import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { CompanyModule } from './company/company.module';
import { CommunityModule } from './community/community.module';
import { QuestionAnswerModule } from './question-answer/question-answer.module';
import CatchException from './error/CatchException';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: true,
        extra: {
          charset: 'utf8mb4_general_ci',
        },
        entities: ['dist/entities/*{.ts,.js}'],
      }),
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    CommunityModule,
    QuestionAnswerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule {}
