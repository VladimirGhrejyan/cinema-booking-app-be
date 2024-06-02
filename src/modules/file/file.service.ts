import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import * as process from 'node:process';
// common
import { STATIC_FILES_PATH } from '~common/constants';

@Injectable()
export class FileService {
  public async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const extension = '.' + file.mimetype.split('/')[1];
      const fileName = uuid.v4() + extension;
      const filePath = path.resolve(process.cwd(), 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return process.env.APP_URL + STATIC_FILES_PATH + '/' + fileName;
    } catch {
      throw new InternalServerErrorException('Error occurred while writing the file');
    }
  }
}
