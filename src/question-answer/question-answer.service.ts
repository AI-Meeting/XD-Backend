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
import { uuid } from 'uuidv4';
import { Interview } from '../entities/Interview';

@Injectable()
export class QuestionAnswerService {
  constructor(
    @InjectRepository(QuestionAnswer)
    private readonly questionAnswerRepository: Repository<QuestionAnswer>,
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}

  async postQuestionAnswer(
    userId: number,
    files: Array<Express.Multer.File>,
    questionId: number,
    companyId: number,
    body: QuestionAnswerPostDto,
  ) {
    const answer = new QuestionAnswer();
    answer.questionId = questionId;
    answer.answer = body.answer;
    answer.userId = userId;

    const interview = new Interview();
    interview.userId = userId;
    interview.companyId = companyId;

    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    if (files === undefined) {
      try {
        await this.questionAnswerRepository.save(answer);
        await this.interviewRepository.save(interview);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const date = Date.now();
        const firstUUID = uuid();
        const secondUUID = uuid();

        console.log(files);

        // 버킷 저장
        await new AWS.S3()
          .putObject({
            Key: `${date + firstUUID}`,
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
                Key: `${date + firstUUID}`,
              },
              (err, url) => {
                answer.videoUrl = url.split('?')[0];
                this.questionAnswerRepository.save(answer);
                console.log(url);
              },
            );
          });

        await new AWS.S3()
          .putObject({
            Key: `${date + secondUUID}`,
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
                Key: `${date + secondUUID}`,
              },
              (err, url) => {
                answer.videoUrl = url.split('?')[0];
              },
            );
          })
          .then(() => {
            this.questionAnswerRepository.save(answer);
            this.interviewRepository.save(interview);
          });
      } catch (error) {
        console.log(error);
      }
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
