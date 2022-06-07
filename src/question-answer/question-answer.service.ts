import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionAnswer } from '../entities/QuestionAnswer';
import { QuestionAnswerPostDto } from './dto/question-answer-post.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class QuestionAnswerService {
  constructor(
    @InjectRepository(QuestionAnswer)
    private readonly questionAnswerRepository: Repository<QuestionAnswer>,
  ) {}

  async postQuestionAnswer(
    userId: number,
    files: Array<Express.Multer.File>,
    questionId: number,
    body: QuestionAnswerPostDto,
  ) {
    const answer = new QuestionAnswer();
    answer.questionId = questionId;
    answer.answer = body.answer;
    answer.userId = userId;

    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    try {
      const date = Date.now();

      // 버킷 저장
      await new AWS.S3()
        .putObject({
          Key: `${date + files[0].originalname}`,
          Body: files[0].buffer,
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          ACL: 'public-read',
        })
        .promise()
        .then(async () => {
          // 버킷 URL 가져오기
          await new AWS.S3().getSignedUrl(
            'getObject',
            {
              Bucket: process.env.AWS_S3_BUCKET_NAME,
              Key: `${date + files[0].originalname}`,
            },
            (err, url) => {
              if (err) {
                throw err;
              }
              answer.voiceUrl = url;
            },
          );
        });

      await new AWS.S3()
        .putObject({
          Key: `${date + files[1].originalname}`,
          Body: files[1].buffer,
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          ACL: 'public-read',
        })
        .promise()
        .then(async () => {
          // 버킷 URL 가져오기
          await new AWS.S3().getSignedUrl(
            'getObject',
            {
              Bucket: process.env.AWS_S3_BUCKET_NAME,
              Key: `${date + files[1].originalname}`,
            },
            (err, url) => {
              if (err) {
                throw err;
              }

              answer.videoUrl = url;
              this.questionAnswerRepository.save(answer);
            },
          );
        });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteQuestionAanswer(userId: number, answerId: number) {
    const answer = await this.questionAnswerRepository.findOne({
      id: answerId,
    });

    if (!answer) {
      throw new NotFoundException();
    } else if (userId !== answer.userId) {
      throw new UnauthorizedException();
    }

    await this.questionAnswerRepository.delete({ id: answerId });
  }

  async patchQuestionAnswer(
    userId: number,
    answerId: number,
    body: QuestionAnswerPostDto,
  ) {
    const isAnaswer = await this.questionAnswerRepository.findOne({
      id: answerId,
    });

    if (!isAnaswer) {
      throw new NotFoundException();
    } else if (userId !== isAnaswer.userId) {
      throw new UnauthorizedException();
    }

    await this.questionAnswerRepository.update({ id: answerId }, body);
  }
}
