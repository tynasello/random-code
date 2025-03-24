import { CreateMovieInput } from './dto/create-movie.input'
import { Movie } from './entities/movie.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private moviesRepository: Repository<Movie>
    ) {}

    async findAll(): Promise<Movie[]> {
        return this.moviesRepository.find()
    }

    async createMovie(createMovieInput: CreateMovieInput): Promise<Movie> {
        const newMovie = this.moviesRepository.create(createMovieInput)
        return this.moviesRepository.save(newMovie)
    }

    async findOne(id: number): Promise<Movie> {
        return this.moviesRepository.findOneOrFail(id)
    }
}
