import { CreateUserInput } from './dto/create-user.input'
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards'

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User, { name: 'user' })
    @UseGuards(JwtAuthGuard)
    findOne(@Context() context) {
        return this.usersService.findOne(context.req.user.username)
    }
}
