import { apiClient } from "./api";

export class StorageService {
  // Upload single file
  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.upload<string>(
      "/storage/upload",
      formData
    );
    return response;
  }

  // Upload multiple files
  async uploadMultiple(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const response = await apiClient.upload<string[]>(
      "/storage/upload-multiple",
      formData
    );
    return response;
  }
}

export const storageService = new StorageService();
