import BlogService from "@/api/services/blogService";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import MarkdownEditor from "@/components/atoms/markdown-editor";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/_auth/dashboard/$blogId/edit")({
  component: BlogEditComponent,
});

function BlogEditComponent() {
  const { blogId } = useParams({ from: "/_auth/dashboard/$blogId/edit" });

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery<any>({
    queryKey: ["blog", blogId],
    queryFn: () => BlogService.getBlogByID(blogId),
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    if (blog?.content) {
      setValue(blog.content); // Initialize the editor with the blog content
    }
  }, [blog]);

  if (isLoading) {
    return <div className="p-4">Loading blog...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  if (!blog) {
    return <div className="p-4">Blog not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog: {blog?.title}</h1>
      <MarkdownEditor value={value} setValue={setValue} />
    </div>
  );
}
