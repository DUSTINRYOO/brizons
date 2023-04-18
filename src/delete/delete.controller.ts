import { Body, Controller, Post } from '@nestjs/common';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'dustinbrizonsbucketlfg';

interface DeleteImageInput {
  objectName: string;
}

@Controller('delete')
export class DeleteController {
  @Post('')
  async deleteFile(@Body() data: DeleteImageInput) {
    const { objectName } = data;
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    try {
      const deleteImage = await new AWS.S3()
        .deleteObject({
          Bucket: BUCKET_NAME,
          Key: objectName,
        })
        .promise();

      return {
        deleteImage,
      };
    } catch (e) {
      return null;
    }
  }
}
