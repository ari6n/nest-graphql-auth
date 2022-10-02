import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.inputs';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user && user.password === password) {   // TODO: make this more secure
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async login(loginUserInput: LoginUserInput) {
        const user = await this.usersService.findOne(loginUserInput.username);
        const {password, ...result} = user;         // cutoff password from user structure and put the resulting data into 'result'

        return {
            access_token: 'JWT',        // TODO: implement jwt
            user: result,
        }
    }
}
