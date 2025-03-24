package com.example.demo.movie;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import static java.time.Month.JANUARY;
import static java.time.Month.SEPTEMBER;

@Configuration
public class MovieConfig {

    @Bean
    CommandLineRunner commandLineRunner(MovieRepository repository){
        return args -> {
            Movie goodWillHunting = new Movie(
                    "Good Will Hunting",
                    "Drama",
                    LocalDate.of(1998, JANUARY, 9),
                    9.1
            );
            Movie theShawshankRedemption = new Movie(
                    "The Shawshank Redemption",
                    "Drama",
                    LocalDate.of(1994, SEPTEMBER, 22),
                    9.4
            );

            repository.saveAll(
                    List.of(goodWillHunting,theShawshankRedemption)
            );
        };
    }

}
