import { HttpException } from '@nestjs/common';

export default class HttpError extends HttpException {
  constructor(status: number, message: string) {
    super(message, status);
    this.message = message;
  }
}
