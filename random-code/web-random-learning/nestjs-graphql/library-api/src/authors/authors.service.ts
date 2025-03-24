import { PrismaService } from './../prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateAuthorInput } from './dto/create-author.input'
import { UpdateAuthorInput } from './dto/update-author.input'

@Injectable()
export class AuthorsService {
    constructor(private prisma: PrismaService) {}

    create(createAuthorInput: CreateAuthorInput) {
        return this.prisma.author.create({
            data: createAuthorInput,
        })
    }

    findAll() {
        return this.prisma.author.findMany({
            include: {
                books: true,
            },
        })
    }

    findOne(id: number) {
        return this.prisma.author.findUnique({
            where: { id },
        })
    }

    update(id: number, data: UpdateAuthorInput) {
        return this.prisma.author.update({
            where: {
                id,
            },
            data,
        })
    }

    remove(id: number) {
        return this.prisma.author.delete({
            where: { id },
        })
    }
}
