import { apiService } from "./apiService";

interface TranslateDataRequest {
  text: string;
  source_language_code: string;
  target_language_codes: string[];
}

interface TranslateDataResponse {
  response: string;
}

class TranslateService {
  static async getTranslateData(
    data: TranslateDataRequest
  ): Promise<TranslateDataResponse> {
    return apiService.post("/translate", data);
  }
}

export default TranslateService;
