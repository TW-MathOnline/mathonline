import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.MO_GRAPHQL_API ?? "http://localhost:4000/api/graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/client/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        scalars: {
          File: "file",
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
