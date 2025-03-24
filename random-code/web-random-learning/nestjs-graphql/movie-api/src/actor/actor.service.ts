import { MoviesService } from './../movies/movies.service'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateActorInput } from './dto/create-actor.input'
import { Actor } from './entities/actor.entity'
import { Movie } from 'src/movies/entities/movie.entity'

@Injectable()
export class ActorService {
    constructor(
        @InjectRepository(Actor) private actorsRepository: Repository<Actor>,
        private moviesService: MoviesService
    ) {}

    async findAll(): Promise<Actor[]> {
        return this.actorsRepository.find()
    }

    async createActor(createActorInput: CreateActorInput): Promise<Actor> {
        const newActor = this.actorsRepository.create(createActorInput)
        return this.actorsRepository.save(newActor)
    }

    async findOne(id: number): Promise<Actor> {
        return this.actorsRepository.findOneOrFail(id)
    }

    async getMovie(movieId: number): Promise<Movie> {
        return this.moviesService.findOne(movieId)
    }
}
