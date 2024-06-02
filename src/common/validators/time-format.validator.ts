import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'timeFormat', async: false })
export class TimeFormatValidator implements ValidatorConstraintInterface {
  validate(time: string) {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in HH:mm format`;
  }
}
