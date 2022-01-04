import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "@prisma/client";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'name' });
    }

    async validate(name: string, password: string): Promise<Omit<User, 'passwordHash'>> {
        const user = await this.authService.validateUser(name, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}