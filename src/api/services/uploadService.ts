import { apiService } from "./apiService";

interface GetPresignedUrlData {
  file_name: string;
  file_type: string;
  file_path: string;
}

interface GetPresignedUrlResponse {
  presigned_url: string;
}

class UploadService {
  static async getPresignedUrl(
    data: GetPresignedUrlData
  ): Promise<GetPresignedUrlResponse> {
    return apiService.post("/pre-signed", data);
  }
  static async uploadAudio(blob: Blob) {}
  static async uploadFile(blob: File) {}
}

export default UploadService;
