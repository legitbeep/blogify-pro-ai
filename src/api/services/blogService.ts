import { apiService } from "./apiService";

interface BlogRequest {
  content: string;
}

interface BlogResponse {
  response: string;
}

class BlogService {
  static async getBlog(data: BlogRequest): Promise<BlogResponse> {
    return apiService.post("/blogs", data);
  }
}

export default BlogService;
