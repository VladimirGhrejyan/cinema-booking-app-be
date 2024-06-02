import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '~exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const obj = plainToInstance(metatype, value);
    const errors = await validate(obj);

    if (errors.length > 0) {
      const firstErrorMessage = Object.values(errors[0].constraints || {})[0];
      throw new ValidationException(firstErrorMessage);
    }

    return obj;
  }

  private toValidate(metatype: unknown): boolean {
    const types: (new (...args: any[]) => any)[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype as any);
  }
}
