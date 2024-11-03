import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { logger } from "../api/config/logger";
import { ExtendedBaseContext, schema } from "../api/graphql/schema";
import { renderGraphiQL } from "./graphiQL";

const port = Number.parseInt(process.env.PORT ?? "4000");
const url = "api/graphql";

export async function startServer() {
    // Create a Yoga instance with a GraphQL schema.
    const yoga = createYoga<ExtendedBaseContext>({
        schema,
        graphqlEndpoint: url,
        context: () => {
            return {
                logger: logger.child({}),
            };
        },
        renderGraphiQL: () => renderGraphiQL(url),
    });

    // Pass it into a server to hook into request handlers.
    const server = createServer(yoga);

    // Start the server and you're done!
    server.listen(port, () => {
        console.info(`🚀 Server is running on http://localhost:${port}/${url}`);
    });
}
