import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {  // AuthGuard using strategy 'local'
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext) {
        // because of using GraphQL, we have to use mapping data loginUserInput from context of GQL request to request body 
        // (GQL doesn't use or have request - it's using context instead of it) to get AuthGuard's mechanism to work
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext();
        request.body = ctx.getArgs().loginUserInput;
        return request;
    }
}