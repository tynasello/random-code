import { Injectable } from '@nestjs/common'
import { PrismaService } from './../prisma.service'
import { CreateUserInput } from './dto/create-user.input'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    create(createUserInput: CreateUserInput) {
        return this.prisma.user.create({
            data: createUserInput,
        })
    }
    findOne(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
        })
    }
}
