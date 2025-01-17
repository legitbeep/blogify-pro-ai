import { apiService } from "./apiService";

interface UserDataResponse {
  picture: string;
  name: string;
  email: string;
}

class AuthService {
  static async getUser(): Promise<UserDataResponse> {
    return apiService.get("/user");
  }
}
export default AuthService;
