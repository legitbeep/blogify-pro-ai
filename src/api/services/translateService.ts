import axios from "axios";
import { apiService } from "./apiService";

interface TranslateDataRequest {
  text: string;
  source_language_code: string;
  target_language_codes: string[];
}

// interface TranslateDataResponse {
//   response: any;
// }

class TranslateService {
  static async getTranslateData(data: TranslateDataRequest): Promise<any> {
    return axios.post(`${import.meta.env.VITE_API_BASE_URL}/translate`, data);
  }
}

export default TranslateService;
