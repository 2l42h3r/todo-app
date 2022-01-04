import { Injectable } from "@nestjs/common";
import { UserService } from "../models/users/user.service";
import { JwtService } from "@nestjs/jwt";
import type { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<null | Omit<User, 'passwordHash'>> {
        const user = await this.userService.user({ name: username });
        if (user && user.passwordHash === password) {
            const { passwordHash: _password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.name, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}