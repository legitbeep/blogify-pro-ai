import { apiService } from "./apiService";
interface BlogUpdateRequest {
  data: any;
  blog_id: string;
}

interface BlogRequest {
  content: string;
  transcripts: any;
  blog_id: string;
  is_blog?: boolean;
}

export interface TagType {
  value: string;
  label: string;
}

export interface BlogResponse {
  _id: string;
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
  static async getBlogByID(blogId: string): Promise<BlogResponse> {
    return apiService.get(`/blog/${blogId}`);
  }
  static async createBlog(data: BlogRequest): Promise<string> {
    return apiService.post(`/blogs`, data);
  }

  static async updateBlog(data: any): Promise<{ result: boolean }> {
    return apiService.patch("/blogs", data);
  }
  static queryKeys = {
    index: "Blog Service",
    createBlog: (params?: any) => [
      this.queryKeys.index,
      JSON.stringify(params),
    ],
    updateBlog: (params?: any) => [
      this.queryKeys.index,
      "update-blog",
      JSON.stringify(params),
    ],
    getDrafts: (params?: any) => [
      this.queryKeys.index,
      "get-draft",
      JSON.stringify(params),
    ],
    getBlogs: (params?: any) => [
      this.queryKeys.index,
      "get-blogs",
      JSON.stringify(params),
    ],
  };
}

export default BlogService;
