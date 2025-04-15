use std::{
    fs, 
    io::{BufRead, BufReader, Write}, 
    net::{TcpListener, TcpStream}, 
    thread::{self, Thread},
    time::Duration
};

use multithreaded_web_server::ThreadPool;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4);

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
    }

    println!("Shutting down.");
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let request_line = buf_reader
        .lines()
        .next()
        .unwrap()
        .unwrap();

    let (status_line, filename) = match &request_line[..] {
        "GET / HTTP/1.1" => ("HTTP/1.1 200 OK", "index.html"),
        "GET /sleep HTTP/1.1" => {
            thread::sleep(Duration::from_secs(5));
            ("HTTP/1.1 200 OK", "index.html")
        }
        _ => ("HTTP/1.1 404 NOT FOUND", "404.html"),
    };

    let contents = fs::read_to_string(filename).unwrap();
    let contents_len = contents.len();

    let response =
        format!("{status_line}\r\nContent-Length: {contents_len}\r\n\r\n{contents}");

    stream.write_all(response.as_bytes()).unwrap();
}