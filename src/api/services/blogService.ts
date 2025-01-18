import { apiService } from "./apiService";
interface BlogRequest {
  content: string;
}

interface BlogResponse {
  response: string;
}
class BlogService {
  static async getBlogs() {
    return apiService.get("/list");
  }
  static async getBlog(data: BlogRequest): Promise<BlogResponse> {
    return apiService.post("/blogs", data);
  }
  static queryKeys = {
    index: "Blog Service",
    getBlog: (params?: any) => [this.queryKeys.index, JSON.stringify(params)],
    getBlogs: (params?: any) => [this.queryKeys.index, JSON.stringify(params)],
  };
}

export default BlogService;
