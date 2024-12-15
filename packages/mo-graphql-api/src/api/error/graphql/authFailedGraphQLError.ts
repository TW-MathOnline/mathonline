import { GraphQLError } from "graphql";

export class AuthFailedGraphQLError extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: {
                code: "AUTH_FAILED_ERROR",
            },
        });
    }
}
