import { Author } from './../../authors/entities/author.entity'
import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Book {
    @Field((type) => Int)
    id: number

    @Field()
    title: string

    @Field((type) => Author, { nullable: true })
    author?: Author

    @Field((type) => Int, { nullable: true })
    authorId?: number
}
