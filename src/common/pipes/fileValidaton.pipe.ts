import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const allowedMimeType = 'text/csv';
        if (value.mimetype !== allowedMimeType) {
            throw new BadRequestException(`Tipo de arquivo invalido. Use um arquivo .csv`);
          }
          return value
    }
}