import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class LoginResponse{
    @Field()
    access_token: string;   // JWT-token

    @Field(() => User)      // Logged in user
    user: User;
}