import { Movie } from './entities/movie.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { MoviesService } from './movies.service'
import { MoviesResolver } from './movies.resolver'

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    providers: [MoviesService, MoviesResolver],
    exports: [MoviesService],
})
export class MoviesModule {}
