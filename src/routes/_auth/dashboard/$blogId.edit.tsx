import BlogService from "@/api/services/blogService";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import MarkdownEditor from "@/components/atoms/markdown-editor";
import { useState, useEffect } from "react";
import BlogEditNavbar from "@/components/modules/blogs/blog-edit-navbar";
import Footer from "@/components/atoms/footer";
import LanguageDialog, {
  LanguageType,
} from "@/components/atoms/language-dialog";
import TranslateService from "@/api/services/translateService";
import { toast } from "sonner";
import { CONSTANTS } from "@/lib/utils";

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
    isSuccess,
  } = useQuery<any>({
    queryKey: ["blog", blogId],
    queryFn: () => BlogService.getBlogByID(blogId),
  });

  const [selectedLangs, setSelectedLangs] = useState<LanguageType[]>([
    CONSTANTS.LANGUAGES.find((lang) => lang.value == "en")!,
  ]);

  const translateMutation = useMutation({
    mutationFn: (langs: LanguageType[]) => {
      if (langs.length == 0) {
        toast.error("Select atleast 1");
      }
      setSelectedLangs(langs);
      return TranslateService.getTranslateData({
        text: blog?.content,
        source_language_code: "en",
        target_language_codes: langs.map((lang) => lang.value),
      });
    },
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    if (blog?.content) {
      setValue(blog.content); // Initialize the editor with the blog content
    }
  }, [blog, isSuccess]);

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  if (!blog) {
    return <div className="p-4">Blog not found</div>;
  }

  return (
    <>
      <BlogEditNavbar />
      <div className="p-4 container min-h-[90dvw] mt-32 mx-auto">
        <LanguageDialog
          isLoading={translateMutation.isPending}
          onConfirm={translateMutation.mutate}
          selectedLangs={selectedLangs}
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-4">Blog: {blog?.title}</h1>
          <MarkdownEditor value={value} setValue={setValue} />
        </div>
      </div>
      <Footer />
    </>
  );
}
