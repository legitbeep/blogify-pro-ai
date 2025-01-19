import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import { Loader2, Pause, Pen, Play, Save } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import BlogService from "@/api/services/blogService";
import { toast } from "sonner";
import AuthService from "@/api/services/authService";
import PublishDialog from "../modules/blogs/publish-dialog";
import TranslateService from "@/api/services/translateService";
import { CONSTANTS } from "@/lib/utils";
import LanguageDialog, { LanguageType } from "./language-dialog";

interface MarkdownEditorProps {
  initialValue?: string;
  hideEdit?: boolean;
  blogData: any;
}

export default function MarkdownEditor({
  initialValue,
  blogData,
  hideEdit = false,
}: MarkdownEditorProps) {
  const { blogId } = useParams({ from: "/_auth/dashboard/$blogId/edit" });
  const [loadingPublish, setLoadingPublish] = useState(false);
  const navigate = useNavigate();
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isPublished = blogData?.data?.is_blog ?? false;
  const updateBlogMutation = useMutation({
    mutationFn: (translatedRes: any) =>
      BlogService.updateBlog({
        ...(!!translatedRes
          ? {
              transcripts: translatedRes,
              is_blog: true,
            }
          : {}),
        content: value ?? "",
        blog_id: blogId,
      }),
    onSuccess: (res, payload) => {
      toast.success(payload ? "Blog Published!" : "Draft saved!");
      if (payload) {
        navigate({
          to: "/",
        });
      }
      setShowEdit(false);
    },
    onSettled: () => {
      setLoadingPublish(false);
    },
  });

  const userQuery = useQuery({
    queryKey: AuthService.queryKeys.getUser(),
    queryFn: AuthService.getUser,
    staleTime: Infinity,
  });

  hideEdit = hideEdit || userQuery?.data?._id === blogData?.user_id;

  const [value, setValue] = useState(initialValue);
  const [showEdit, setShowEdit] = useState(false);
  const [editorValue, setEditorValue] = useState(value);
  const [showPublish, setShowPublish] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageType[]>(
    []
  );

  useEffect(() => {
    console.log({ initialValue });
    setValue(initialValue);
    setEditorValue(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    setValue(editorValue); // Save the changes to the parent state
    setShowEdit(false); // Switch back to preview state
  };

  const handleCancel = () => {
    setEditorValue(value); // Revert to the original value
    setShowEdit(false); // Switch back to preview state
  };

  const handleChange = (newValue?: string) => {
    if (newValue !== undefined) {
      setEditorValue(newValue); // Update the local editor state
    }
  };

  const onPublish = () => {
    setShowPublish(true);
  };

  const onConfirmPublish = async () => {
    if (!editorValue) {
      toast.error("Cannot publish an empty blog");
      return;
    }
    setLoadingPublish(true);

    try {
      const translatedResponse = await TranslateService.getTranslateData({
        text: editorValue ?? "",
        source_language_code: "en",
        target_language_codes: CONSTANTS.LANGUAGES.filter(
          (l) => l.value !== "en"
        ).map((lang) => lang.value),
      });
      await updateBlogMutation.mutate(translatedResponse?.data ?? []);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to save draft");
      setLoadingPublish(false);
    }
  };

  const onToggleAudioPlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="p-4 my-4 bg-white rounded-lg shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
      {isPublished && (
        <LanguageDialog
          selectedLangs={selectedLanguages}
          onConfirm={(val) => setSelectedLanguages(val)}
        />
      )}
      {showEdit ? (
        <div className="space-y-4">
          <MDEditor
            value={editorValue}
            onChange={handleChange}
            height={300}
            className="border border-gray-300 rounded-lg p-2 bg-white text-black dark:bg-black dark:text-white dark:border-gray-600"
          />
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleSave}
              variant="default"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <Save className="mr-2" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="secondary"
              className="bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end space-x-4">
            {!showEdit &&
              blogData?.user_id === userQuery?.data?._id &&
              !blogData?.is_blog && (
                <Button className="" onClick={onPublish}>
                  Publish
                </Button>
              )}
            {!blogData?.is_blog && (
              <Button
                onClick={() => setShowEdit(true)}
                variant="outline"
                className="bg-transparent "
              >
                <Pen className="mr-2" />
                Edit
              </Button>
            )}
            {blogData?.audio_file_url && !showEdit && (
              <>
                <Button
                  onClick={onToggleAudioPlay}
                  variant="outline"
                  className="bg-transparent "
                >
                  {!isPlaying ? (
                    <>
                      <Play className="mr-2" />
                      Play
                    </>
                  ) : (
                    <>
                      <Pause className="mr-2" /> Pause
                    </>
                  )}
                </Button>
                <audio
                  ref={audioRef}
                  src={blogData?.audio_file_url}
                  className="invisible"
                />
              </>
            )}
          </div>
          <MDEditor.Markdown source={editorValue} />
        </div>
      )}
      {showPublish && (
        <PublishDialog
          isLoading={loadingPublish}
          onClose={() => setShowPublish(false)}
          onAction={onConfirmPublish}
        />
      )}
    </div>
  );
}
