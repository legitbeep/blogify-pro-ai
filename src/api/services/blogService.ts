import { apiService } from "./apiService";
interface BlogRequest {
  content: string;
}

export interface TagType {
  value: string;
  label: string;
}

export interface BlogResponse {
  id: string;
  audio_file_url?: string;
  views: number;
  content: string;
  is_blog: boolean;
  likes: number;
  title: string;
  tags: Array<TagType>;
  timestamp: string;
  transcripts: any;
  user: {
    id: string;
    email: string;
    firebase_token: string;
    name: string;
    picture: string;
    post_remaining: number;
  };
  user_id: string;
}
class BlogService {
  static async getBlogs(): Promise<BlogResponse[]> {
    return apiService.get("/blogs");
  }
  static async getDrafts(): Promise<BlogResponse[]> {
    return apiService.get("/drafts");
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
    getDrafts: (params?: any) => [this.queryKeys.index, JSON.stringify(params)],
    getBlogs: (params?: any) => [this.queryKeys.index, JSON.stringify(params)],
  };
}

export default BlogService;
