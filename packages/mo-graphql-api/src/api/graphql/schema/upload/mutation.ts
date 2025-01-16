import {
    MutationUploadTopicFileArgs,
    UploadTopicFileInput,
} from "../../../../__generated__/server/resolvers-types";
import { ExtendedBaseContext } from "../../schema";

export const uploadMutation = {
    uploadTopicFile: async (
        parent: unknown,
        args: MutationUploadTopicFileArgs,
        { logger }: ExtendedBaseContext,
    ): Promise<UploadTopicFileInput> => {
        logger.trace({ args }, "uploadTopicFile mutation");

        logger.info(args.data.topicFile.size);
        return args.data;
    },
};
