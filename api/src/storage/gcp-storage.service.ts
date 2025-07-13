import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class GcpStorageService {
  private storage: Storage;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get('GCP_BUCKET_NAME');
    
    this.storage = new Storage({
      projectId: this.configService.get('GCP_PROJECT_ID'),
      credentials: {
        private_key: this.configService.get('GCP_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
        client_email: this.configService.get('GCP_CLIENT_EMAIL'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'products'): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;
    const fileBuffer = file.buffer;

    const fileUpload = bucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false,
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
        resolve(publicUrl);
      });

      stream.end(fileBuffer);
    });
  }

  async deleteFile(fileName: string): Promise<void> {
    const bucket = this.storage.bucket(this.bucketName);
    await bucket.file(fileName).delete();
  }

  async uploadMultipleFiles(files: Express.Multer.File[], folder: string = 'products'): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }
}