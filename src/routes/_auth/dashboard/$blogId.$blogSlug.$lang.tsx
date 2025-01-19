import BlogService from "@/api/services/blogService";
import Footer from "@/components/atoms/footer";
import MarkdownEditor from "@/components/atoms/markdown-editor";
import BlogEditNavbar from "@/components/modules/blogs/blog-edit-navbar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/dashboard/$blogId/$blogSlug/$lang"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { blogId, blogSlug, lang } = useParams({
    from: "/_auth/dashboard/$blogId/$blogSlug/$lang",
  });

  const blogQuery = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => BlogService.getBlogByID(blogId),
    enabled: !!blogId,
  });

  console.log({ blogQuery });

  return (
    <>
      <BlogEditNavbar />
      <div className="container mx-auto px-4">
        <MarkdownEditor
          blogData={blogQuery?.data}
          initialValue={blogQuery?.data?.content ?? ""}
        />
        {blogQuery?.data?.is_blog &&
          blogQuery?.data?.transcripts?.map((transcript: any) => (
            <MarkdownEditor
              initialValue={transcript?.content ?? ""}
              blogData={blogQuery?.data}
            />
          ))}
      </div>
      <Footer />
    </>
  );
}
