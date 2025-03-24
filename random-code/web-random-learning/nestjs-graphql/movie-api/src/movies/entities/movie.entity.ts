import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Actor } from 'src/actor/entities/actor.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Movie {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number

    @Column()
    @Field()
    title: string

    @Column({ nullable: true })
    @Field((type) => Int, { nullable: true })
    rating?: number

    @OneToMany(() => Actor, (actor) => actor.movie)
    @Field((type) => [Actor], { nullable: true })
    actors?: Actor[]
}
