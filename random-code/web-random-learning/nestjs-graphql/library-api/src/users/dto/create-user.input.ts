import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Max, Min } from 'class-validator'

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    username: string

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string
}
