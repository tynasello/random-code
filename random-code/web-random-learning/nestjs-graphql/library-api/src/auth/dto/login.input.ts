import { User } from '../../users/entities/user.entity'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginInput {
    @Field()
    username: string

    @Field()
    password: string
}
