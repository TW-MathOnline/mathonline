import { gql } from "@/__generated__/client/gql";

export const UPLOAD_TOPIC_FILE_MUTATION = gql(/* GraphQL */ `
  mutation UploadTopicFile($data: UploadTopicFileInput!) {
    uploadTopicFile(data: $data) {
      topicFile
      assets
      course
      topic
    }
  }
`);
