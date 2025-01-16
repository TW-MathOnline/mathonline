import { gql } from "graphql-tag";

export const uploadTypeDef = gql`
    input UploadTopicFileInput {
        topicFile: File!
        assets: [File!]!
        course: String!
        topic: String!
    }

    type UploadTopicFileDto {
        topicFile: File!
        assets: [File!]!
        course: String!
        topic: String!
    }

    extend type Mutation {
        uploadTopicFile(data: UploadTopicFileInput!): UploadTopicFileDto!
    }
`;
