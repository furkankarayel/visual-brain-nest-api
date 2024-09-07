import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

type AuthInput = {email: string, password: string}
type AuthResult = {accessToken: string; userId: number; email: string};
type SignInData = {id: number; name: string; email: string}

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.userService.handleLogin(input.email,input.password)

        if (!user) {
            throw new UnauthorizedException();
        }

        return this.signIn(user)
    }

    async signIn(user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.id,
            name: user.name,
            email: user.email
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {accessToken, userId: user.id, email: user.email}
    }

}
