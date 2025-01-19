import BlogService from "@/api/services/blogService";
import Footer from "@/components/atoms/footer";
import MarkdownEditor from "@/components/atoms/markdown-editor";
import BlogEditNavbar from "@/components/modules/blogs/blog-edit-navbar";
import { LanguageSelector } from "@/components/modules/blogs/language-selector";
import { MessageLoading } from "@/components/ui/message-loading";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/dashboard/$blogId/edit")({
  component: BlogEditComponent,
});

function BlogEditComponent() {
  const { blogId } = useParams({ from: "/_auth/dashboard/$blogId/edit" });
  // extract query params lang and slug if no lang then 'en' using window object
  const lang = new URLSearchParams(window.location.search).get("lang") ?? "en";
  const slug =
    new URLSearchParams(window.location.search).get("slug") ?? "slug";
  const blogQuery = useQuery<any>({
    queryKey: ["blog", blogId],
    queryFn: () => BlogService.getBlogByID(blogId),
    enabled: !!blogId,
  });

  const [langState, setLangState] = useState<string>(lang);
  const navigate = useNavigate();

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

  const onLangChange = (lang: any) => {
    console.log({ lang });
    navigate({
      to: `/dashboard/${blogId}/edit?lang=${lang?.value ?? "en"}`,
    });
    setLangState(lang?.value ?? "en");
  };

  console.log({
    transcript: blogQuery?.data?.transcripts?.find(
      (transcript: any) => transcript?.language_code === lang
    ),
    initVal:
      blogQuery?.data?.transcripts?.find(
        (transcript: any) => transcript?.language_code === langState
      )?.content ?? blogQuery?.data?.content,
  });

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
            Title: {blogQuery?.data?.title}
          </h1>
          {blogQuery?.data?.is_blog && (
            <LanguageSelector
              defaultValue={langState}
              onLangChange={onLangChange}
            />
          )}
          <MarkdownEditor
            initialValue={
              blogQuery?.data?.transcripts?.find(
                (transcript: any) => transcript?.language_code === langState
              )?.content ?? blogQuery?.data?.content
            }
            blogData={blogQuery?.data}
            audioUrl={
              langState == "en"
                ? blogQuery?.data?.audio_file_url
                : blogQuery?.data?.transcripts?.find(
                    (transcript: any) => transcript?.language_code === langState
                  )?.audio
            }
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
