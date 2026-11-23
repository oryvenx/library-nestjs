import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TitleFormatPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value != 'string') {
      return value;
    }

    if (value.trim().length < 3) {
      throw new BadRequestException("Title must have at least 2 characters")
    }

    return value
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }
}
