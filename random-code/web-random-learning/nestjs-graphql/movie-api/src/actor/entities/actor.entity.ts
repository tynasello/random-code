import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Movie } from 'src/movies/entities/movie.entity'

@Entity()
@ObjectType()
export class Actor {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number

    @Column()
    @Field()
    name: string

    @Column()
    @Field((type) => Int)
    movieId: number

    @ManyToOne(() => Movie, (movie) => movie.actors)
    @Field((type) => Movie)
    movie: Movie
}
