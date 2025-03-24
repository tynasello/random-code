import {
    Resolver,
    Query,
    Mutation,
    Args,
    Int,
    Parent,
    ResolveField,
} from '@nestjs/graphql'
import { ActorService } from './actor.service'
import { Actor } from './entities/actor.entity'
import { CreateActorInput } from './dto/create-actor.input'
import { UpdateActorInput } from './dto/update-actor.input'
import { Movie } from 'src/movies/entities/movie.entity'

@Resolver((of) => Actor)
export class ActorResolver {
    constructor(private actorService: ActorService) {}

    @Query((returns) => [Actor])
    actors(): Promise<Actor[]> {
        return this.actorService.findAll()
    }

    @Query((returns) => Actor)
    getActor(@Args('id', { type: () => Int }) id: number): Promise<Actor> {
        return this.actorService.findOne(id)
    }

    @Mutation((returns) => Actor)
    createActor(
        @Args('createActorInput') createActorInput: CreateActorInput
    ): Promise<Actor> {
        return this.actorService.createActor(createActorInput)
    }

    @ResolveField((returns) => [Actor])
    getMovie(@Parent() actor: Actor): Promise<Movie> {
        return this.actorService.getMovie(actor.movieId)
    }
}
