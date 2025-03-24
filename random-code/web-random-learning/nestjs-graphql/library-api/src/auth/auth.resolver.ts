import { LoginSignupRefreshResponse } from './dto/login-signup-refresh-response'
import { Tokens } from '../types/tokent.type'
import { CreateUserInput } from './../users/dto/create-user.input'
import { LoginInput } from './dto/login.input'
import { AuthService } from './auth.service'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard, JwtRefreshAuthGuard } from '../common/guards'
import { LogoutResponse } from './dto/logout.response'

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}
    @Mutation(() => LoginSignupRefreshResponse)
    signup(
        @Args('createUserInput') createUserInput: CreateUserInput
    ): Promise<Tokens> {
        return this.authService.signup(createUserInput)
    }

    @Mutation(() => LoginSignupRefreshResponse)
    login(@Args('loginInput') loginUserInput: LoginInput): Promise<Tokens> {
        return this.authService.login(
            loginUserInput.username,
            loginUserInput.password
        )
    }

    @Mutation(() => LogoutResponse)
    @UseGuards(JwtAuthGuard)
    logout(@Context() context): Promise<LogoutResponse> {
        return this.authService.logout(context.req.user.username)
    }

    @Mutation(() => LoginSignupRefreshResponse)
    @UseGuards(JwtRefreshAuthGuard)
    refreshTokens(@Context() context): Promise<Tokens> {
        return this.authService.refreshTokens(
            context.req.user.username,
            context.req.user.rt
        )
    }
}
