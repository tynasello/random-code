import { PrismaService } from './../prisma.service'
import { Module } from '@nestjs/common'
import { AuthorsService } from './authors.service'
import { AuthorsResolver } from './authors.resolver'

@Module({
    providers: [AuthorsResolver, AuthorsService, PrismaService],
})
export class AuthorsModule {}
