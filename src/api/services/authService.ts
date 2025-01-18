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

  static queryKeys = {
    index: "Auth Service",
    getUser: (params?: any) => [this.queryKeys.index, JSON.stringify(params)],
  };
}
export default AuthService;
