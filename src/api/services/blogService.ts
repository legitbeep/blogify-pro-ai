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
  static async getBlogByID(blogId: string) {
    return apiService.get(`/blog/${blogId}`);
  }
  static async createBlog(data: BlogRequest): Promise<string> {
    return apiService.post("/blogs", data);
  }
  static queryKeys = {
    index: "Blog Service",
    createBlog: (params?: any) => [
      this.queryKeys.index,
      JSON.stringify(params),
    ],
    getBlogs: (params?: any) => [this.queryKeys.index, JSON.stringify(params)],
  };
}

export default BlogService;
