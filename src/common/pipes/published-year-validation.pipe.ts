import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PublishedYearValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const currentYear = new Date().getFullYear();
    const year = Number(value);

    if (year >= 1450 && year <= currentYear) {
      return year;
    }

    throw new BadRequestException(
      `Bad request must be an integer between 1450 and ${currentYear}`,
    );
  }
}
