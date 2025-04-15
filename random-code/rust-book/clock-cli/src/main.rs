use clap::Parser;
use exitfailure::ExitFailure;
use reqwest::Url;
use serde_derive::{Deserialize, Serialize};

#[derive(Parser, Debug)]
struct Args {
    #[arg(short, long)]
    iana_time_zone: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Clock {
    date: String,
    dayOfWeek: String,
    time: String,
    timeZone: String,
}

impl Clock {
    async fn get(iana_time_zone: &String) -> Result<Self, ExitFailure> {
        let url = format!(
            "https://www.timeapi.io/api/Time/current/zone?timeZone={}",
            iana_time_zone
        );
        let url = Url::parse(&url)?;
        let resp = reqwest::get(url).await?.json::<Clock>().await?;
        Ok(resp)
    }
}

#[tokio::main]
async fn main() -> Result<(), ExitFailure> {
    let args = Args::parse();
    let response = Clock::get(&args.iana_time_zone).await?;
    println!("{:?}", response);
    Ok(())
}
