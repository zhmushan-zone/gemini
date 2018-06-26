import {
  Controller,
  FileInterceptor,
  Post,
  UnsupportedMediaTypeException, UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {success} from '../common/utils/response.util';
import {config} from '../config';

@Controller('/api/files')
export class FileController {

  @Post('cover-img')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('coverImg', {
    dest: config.path.coverImg
  }))
  coverImg(@UploadedFile() coverImg) {
    if (!/^(image\/)./i.test(coverImg.mimetype)) {
      return new UnsupportedMediaTypeException();
    }
    return success(coverImg.filename);
  }
}
