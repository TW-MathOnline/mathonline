import { GraphQLError } from "graphql";

export class ResourceDoesNotExistError extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: {
                code: "RESOURCE_DOES_NOT_EXIST_ERROR",
            },
        });
    }
}
