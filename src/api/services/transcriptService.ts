import { apiService } from "./apiService";

interface TranscriptDataRequest {
  media_file_url?: string;
  media_format?: string;
  file_url?: string;
  text?: string;
}

interface TranscriptDataResponse {
  response: string;
}

class TranscriptService {
  static async getTranscriptData(
    data: TranscriptDataRequest
  ): Promise<TranscriptDataResponse> {
    return apiService.post("/transcript", {
      media_file_url:
        "https://superlevelhack.s3.amazonaws.com/video/video_1737231482062.mp4",
      media_format: "mp4",
    });
  }
}

export default TranscriptService;
