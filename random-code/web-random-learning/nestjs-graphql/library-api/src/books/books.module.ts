import { PrismaService } from './../prisma.service'
import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksResolver } from './books.resolver'

@Module({
    providers: [BooksResolver, BooksService, PrismaService],
})
export class BooksModule {}
