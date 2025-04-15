use std::{sync::{mpsc, Arc, Mutex}, thread::{self, sleep}};

type Job = Box<dyn FnOnce() + Send + 'static>;

pub struct ThreadPool {
    workers: Vec<Worker>,
    tx: Option<mpsc::Sender<Job>>
}

impl ThreadPool {
    pub fn new(size: usize) -> Self {
        assert!(size > 0);

        let (tx, rx) = mpsc::channel();
        let rx = Arc::new(Mutex::new(rx));

        let mut workers = Vec::with_capacity(size);

        for i in 0..size {
            workers.push(Worker::new(i, Arc::clone(&rx)));
        }

        Self {
            workers,
            tx: Some(tx)
        }
    }

    pub fn execute<F>(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        let job = Box::new(f);
        self.tx.as_ref().unwrap().send(job).unwrap();
    }
}

impl Drop for ThreadPool {
    fn drop(&mut self) {
        drop(self.tx.take());

        for worker in self.workers.drain(..) {
            println!("Shutting down worker {}", worker.id);
            worker.thread.join().unwrap();
        }
    }
}

struct Worker {
    id: usize,
    thread: thread::JoinHandle<()>
}

impl Worker {
    fn new(id: usize, rx: Arc<Mutex<mpsc::Receiver<Job>>>) -> Self {
        Self {
            id,
            thread: thread::spawn(move || {
                loop {
                    let rx = rx.lock().unwrap();
                    let job = rx.recv();
                    drop(rx);

                    match job {
                        Ok(job) => {
                            println!("Worker {id} got a job; executing.");
                            job();
                        }
                        Err(_) => {
                            println!("Worker {id} disconnected; shutting down.");
                            break;
                        }
                    }
                  
                }
            })
        }
    }
}