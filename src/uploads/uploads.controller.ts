import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    try {
      files.map(async (file) => {
        const upload = await new AWS.S3()
          .putObject({
            Key: `${Date.now() + file.originalname}`,
            Body: file.buffer,
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            ACL: 'public-read',
          })
          .promise()
          .then((res) => console.log(res));
        console.log(upload);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
