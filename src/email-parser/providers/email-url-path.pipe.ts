import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmailUrlPathValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!value || !value.length)
      throw new BadRequestException('Email URL or path must not be empty.');

    try {
      const valueAsURL = new URL(value);
      return valueAsURL.pathname;
    } catch {
      return value;
    }
  }
}
