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
        const date = Date.now();
        // 버킷 저장
        await new AWS.S3()
          .putObject({
            Key: `${date + file.originalname}`,
            Body: file.buffer,
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            ACL: 'public-read',
          })
          .promise()
          .then((res) => console.log(res));

        // 버킷 URL 가져오기
        await new AWS.S3().getSignedUrl(
          'getObject',
          {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${date + file.originalname}`,
          },
          (err, url) => {
            if (err) {
              throw err;
            }
            console.log(url);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
}
