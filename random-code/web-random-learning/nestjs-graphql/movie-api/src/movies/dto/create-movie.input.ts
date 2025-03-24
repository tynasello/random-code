import { Actor } from 'src/actor/entities/actor.entity'
import { Field, InputType, Int } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@InputType()
export class CreateMovieInput {
    @Field()
    title: string

    @Min(0)
    @Max(10)
    @Field((type) => Int, { nullable: true })
    rating?: number
}
