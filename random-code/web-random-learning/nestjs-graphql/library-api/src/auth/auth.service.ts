import { UsersService } from './../users/users.service'
import { Injectable } from '@nestjs/common'
import { User } from 'src/users/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { CreateUserInput } from 'src/users/dto/create-user.input'
import * as bcrypt from 'bcrypt'
import { Tokens } from '../types'
import { PrismaService } from 'src/prisma.service'
import { LogoutResponse } from './dto/logout.response'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) {}

    /*
     * Helpers
     */

    async createTokens(user: User) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    username: user.username,
                    sub: user.id,
                },
                {
                    secret: process.env.AT_SECRET,
                    expiresIn: 900,
                }
            ),
            this.jwtService.signAsync(
                {
                    username: user.username,
                    sub: user.id,
                },
                {
                    secret: process.env.RT_SECRET,
                    expiresIn: 604800,
                }
            ),
        ])
        return { at, rt }
    }

    async upsertRt(username: string, rt: string) {
        const rtHash = await bcrypt.hash(rt, 10)
        await this.prisma.user.update({
            where: {
                username,
            },
            data: {
                rt: rtHash,
            },
        })
    }

    /*
     * --
     */

    async login(username: string, password: string): Promise<Tokens> {
        const user = await this.usersService.findOne(username)
        if (!user) throw new Error('User does not exist')
        try {
            const valid = await bcrypt.compare(password, user.password)
            if (!valid) throw new Error('Invalid Credentials')

            const tokens = await this.createTokens(user)
            this.upsertRt(user.username, tokens.rt)
            return tokens
        } catch {
            throw new Error('Invalid Credentials')
        }
    }

    async signup(createUserInput: CreateUserInput): Promise<Tokens> {
        const password = await bcrypt.hash(createUserInput.password, 10)

        try {
            const newUser = await this.usersService.create({
                ...createUserInput,
                password,
            })

            const tokens = await this.createTokens(newUser)
            this.upsertRt(createUserInput.username, tokens.rt)
            return tokens
        } catch {
            throw new Error('User Already Exists')
        }
    }

    async logout(username: string): Promise<LogoutResponse> {
        await this.prisma.user.updateMany({
            where: {
                username,
                rt: {
                    not: null,
                },
            },
            data: {
                rt: null,
            },
        })
        return { username }
    }

    async refreshTokens(username: string, rt: string) {
        const user = await this.usersService.findOne(username)
        if (!user) throw new Error('User does not exist')

        try {
            const rtMatches = await bcrypt.compare(rt, user.rt)
            if (!rtMatches) throw new Error('Invalid Credentials')

            const tokens = await this.createTokens(user)
            this.upsertRt(username, tokens.rt)
            return tokens
        } catch {
            throw new Error('Invalid Credentials')
        }
    }
}
