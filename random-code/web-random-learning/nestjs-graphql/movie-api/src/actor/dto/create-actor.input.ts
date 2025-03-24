import { InputType, Int, Field } from '@nestjs/graphql'
import { Column } from 'typeorm'

@InputType()
export class CreateActorInput {
    @Field()
    name: string

    @Field((type) => Int, { nullable: true })
    movieId?: number
}
