import { apiService } from "./apiService";

class CallService {
  static async getCall() {
    return apiService.get("/call");
  }
}

export default CallService;
