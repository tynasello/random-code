import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Book } from 'src/books/entities/book.entity'

@ObjectType()
export class Author {
    @Field((type) => Int)
    id: number

    @Field()
    name: string

    @Field((type) => [Book], { nullable: true })
    books?: Book[]
}
