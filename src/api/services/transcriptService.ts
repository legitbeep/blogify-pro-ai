import api from "../axios";
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
    return api.post(
      "https://be61-36-255-8-53.ngrok-free.app/api/transcript",
      data
    );
  }
}

export default TranscriptService;
