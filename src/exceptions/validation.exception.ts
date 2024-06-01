import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  messages: unknown;

  constructor(response: unknown) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
