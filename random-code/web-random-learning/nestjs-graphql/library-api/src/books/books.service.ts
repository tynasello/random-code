import { PrismaService } from './../prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) {}

    create(createBookInput: CreateBookInput) {
        return this.prisma.book.create({
            data: createBookInput,
        })
    }

    findAll() {
        return this.prisma.book.findMany({
            include: {
                author: true,
            },
        })
    }

    findOne(id: number) {
        return this.prisma.book.findUnique({
            where: { id },
        })
    }

    update(id: number, data: UpdateBookInput) {
        return this.prisma.book.update({
            where: {
                id,
            },
            data,
        })
    }

    remove(id: number) {
        return this.prisma.book.delete({
            where: { id },
        })
    }
}
