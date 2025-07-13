import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { GcpStorageService } from './gcp-storage.service';

@Module({
  controllers: [StorageController],
  providers: [GcpStorageService],
  exports: [GcpStorageService],
})
export class StorageModule {}