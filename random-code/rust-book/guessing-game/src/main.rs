use std::{cmp::Ordering, io};
use rand::Rng;

fn main() {
    println!("---> Guess the number <---");

    let mut rng = rand::rng();
    let secret_number: u32 = rng.random_range(1..=100);

    // println!("The secret number is: {secret_number}");

    loop {
        println!("Please input your guess");

        let mut guess: String = String::new();
    
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Please type a number!");
                continue;
            }
        };

        println!("You guessed: {guess}");

        match guess.cmp(&secret_number) {
            Ordering::Equal => {
                println!("You win!");
                break;
            },
            Ordering::Less => println!("Less"),
            Ordering::Greater => println!("Greater")
        }
    }
}
