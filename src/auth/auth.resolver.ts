import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.inputs';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)            // For REST-API it would be simple "@UseGuards(AuthGuard('local'))" without having to implement of class GqlAuthGuard
    login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return this.authService.login(loginUserInput);
    }
}
