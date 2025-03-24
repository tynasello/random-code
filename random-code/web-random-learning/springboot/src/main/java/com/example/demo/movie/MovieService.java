package com.example.demo.movie;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }


    public List<Movie> getMovies(){
        return movieRepository.findAll();
    }

    public void addNewMovies(Movie movie) {
        Optional<Movie> movieOptional = movieRepository.findMoviesByName(movie.getName());
        if(movieOptional.isPresent()){
            throw new IllegalStateException("Name taken");
        }
        movieRepository.save(movie);

    }

    public void deleteMovie(Long movieId) {
        boolean movieExists = movieRepository.existsById(movieId);
        if(!movieExists){
            throw new IllegalStateException("movie with id: " + movieId + " not found");
        }
        movieRepository.deleteById(movieId);
    }

    @Transactional
    public void updateMovie(Long movieId, Double rating) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(()->
                        new IllegalStateException("movie with id: " + movieId + " not found")
                );
        if (rating>=0 && rating <=10){
            movie.setRating(rating);
        }

    }
}
