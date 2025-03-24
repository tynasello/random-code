import { CreateMovieInput } from './dto/create-movie.input'
import { Resolver, Query, Mutation, Args, Int, Parent } from '@nestjs/graphql'
import { Movie } from './entities/movie.entity'
import { MoviesService } from './movies.service'

@Resolver((of) => Movie)
export class MoviesResolver {
    constructor(private moviesService: MoviesService) {}

    @Query((returns) => [Movie])
    movies(): Promise<Movie[]> {
        return this.moviesService.findAll()
    }

    @Query((returns) => Movie)
    getMovie(@Args('id', { type: () => Int }) id: number): Promise<Movie> {
        return this.moviesService.findOne(id)
    }

    @Mutation((returns) => Movie)
    createMovie(
        @Args('createMovieInput') createMovieInput: CreateMovieInput
    ): Promise<Movie> {
        return this.moviesService.createMovie(createMovieInput)
    }
}
