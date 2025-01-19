import { apiService } from "./apiService";

interface UserDataResponse {
  picture: string;
  name: string;
  email: string;
  _id: string;
  post_remaining?: number;
}

interface TokenResponse {
  token: string;
}

interface ClerkUser {
  email: string;
  name: string;
  picture: string;
}
class AuthService {
  static async getUser(): Promise<UserDataResponse> {
    return apiService.get("/user");
  }
  static async getUserToken(user: ClerkUser): Promise<TokenResponse> {
    return apiService.post("/token", user);
  }

  static queryKeys = {
    index: "Auth Service",
    getUser: (params?: any) => [this.queryKeys.index, JSON.stringify(params)],
  };
}
export default AuthService;
