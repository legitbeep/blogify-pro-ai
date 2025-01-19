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
import { MessageLoading } from "@/components/ui/message-loading";

export const Route = createFileRoute("/_auth/dashboard/$blogId/edit")({
  component: BlogEditComponent,
});

function BlogEditComponent() {
  const { blogId } = useParams({ from: "/_auth/dashboard/$blogId/edit" });

  const blogQuery = useQuery<any>({
    queryKey: ["blog", blogId],
    queryFn: () => BlogService.getBlogByID(blogId),
    enabled: !!blogId,
  });

  // const [selectedLangs, setSelectedLangs] = useState<LanguageType[]>([
  //   CONSTANTS.LANGUAGES.find((lang) => lang.value == "en")!,
  // ]);
  // const translateMutation = useMutation({
  //   mutationFn: (langs: LanguageType[]) => {
  //     if (langs.length == 0) {
  //       toast.error("Select atleast 1");
  //     }
  //     setSelectedLangs(langs);
  //     return TranslateService.getTranslateData({
  //       text: blogQuery?.data?.content,
  //       source_language_code: "en",
  //       target_language_codes: langs
  //         .filter((lang) => lang.value != "en")
  //         .map((lang) => lang.value),
  //     });
  //   },
  // });
  if (blogQuery.isError) {
    return (
      <div className="p-4 text-red-500">Error: {blogQuery.error?.message}</div>
    );
  }

  if (blogQuery.isLoading) {
    return (
      <div className="w-100dvw h-dvh flex items-center justify-center">
        <MessageLoading />
      </div>
    );
  }

  return (
    <>
      <BlogEditNavbar />
      <div className="p-4 container min-h-[90dvw] mt-32 mx-auto">
        {/* <LanguageDialog
          isLoading={translateMutation.isPending}
          onConfirm={translateMutation.mutate}
          selectedLangs={selectedLangs}
        /> */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-4">
            Blog: {blogQuery?.data?.title}
          </h1>
          {blogQuery?.data?.is_blog ? (
            <div className="flex flex-col gap-4">
              <span className="text-md font-md">en</span>
              <MarkdownEditor
                blogData={blogQuery?.data}
                initialValue={blogQuery?.data?.content ?? ""}
              />
              {blogQuery?.data?.transcripts?.map((transcript: any) => (
                <>
                  <span className="text-md font-md">
                    {transcript?.language_code}
                  </span>
                  <MarkdownEditor
                    initialValue={transcript?.content ?? ""}
                    blogData={blogQuery?.data}
                    key={transcript?.language_code}
                  />
                </>
              ))}
            </div>
          ) : (
            <MarkdownEditor
              blogData={blogQuery?.data}
              initialValue={blogQuery?.data?.content ?? ""}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
