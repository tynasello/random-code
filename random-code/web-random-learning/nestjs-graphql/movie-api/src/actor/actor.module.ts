import { Actor } from 'src/actor/entities/actor.entity'
import { Module } from '@nestjs/common'
import { ActorService } from './actor.service'
import { ActorResolver } from './actor.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoviesModule } from 'src/movies/movies.module'

@Module({
    imports: [TypeOrmModule.forFeature([Actor]), MoviesModule],
    providers: [ActorResolver, ActorService],
})
export class ActorModule {}
