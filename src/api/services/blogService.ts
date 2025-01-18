import { apiService } from "./apiService";

class BlogService {
  static async getBlogs() {
    return apiService.get("/list");
  }
  static queryKeys = {
    index: "Blog Service",
    getBlogs: (params?: any) => [this.queryKeys.index, JSON.stringify(params)],
  };
}

export default BlogService;
