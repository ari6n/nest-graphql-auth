import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user && user.password === password) {   // TODO: make this more secure
            const {password, ...result} = user;     // cutoff password from user structure and put the resulting data into 'result'
            return result;
        }

        return null;
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign({ 
                username: user.username, 
                sub: user.id 
            }),
            user,
        }
    }
}
