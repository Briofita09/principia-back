import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './common/pipes/fileValidaton.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('state/:uf')
  getVotesByUf(@Param('uf') uf: string) {
    return this.appService.getVotesByUf(uf)
  }

  @Post('/upload/pool')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new FileValidationPipe())
  async uploadFile(@UploadedFile() file: Express.Multer.File){
    return await this.appService.fileUpload(file)
  }

  @Get('/upload/database')
  async updateDatabase(){
    return await this.appService.updateDatabase()
  }

}
