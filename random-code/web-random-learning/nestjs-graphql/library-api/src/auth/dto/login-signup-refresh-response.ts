import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LoginSignupRefreshResponse {
    @Field()
    at: string

    @Field()
    rt: string
}
