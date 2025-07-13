import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { GcpStorageService } from './gcp-storage.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('storage')
@UseGuards(JwtAuthGuard)
export class StorageController {
  constructor(private gcpStorageService: GcpStorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.gcpStorageService.uploadFile(file);
    return {
      status: 'success',
      statusCode: 200,
      message: 'File uploaded successfully',
      data: { url },
    };
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await this.gcpStorageService.uploadMultipleFiles(files);
    return {
      status: 'success',
      statusCode: 200,
      message: 'Files uploaded successfully',
      data: { urls },
    };
  }
}