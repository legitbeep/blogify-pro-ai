import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import { Loader2, Pen, Save } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import BlogService from "@/api/services/blogService";
import { toast } from "sonner";
import AuthService from "@/api/services/authService";
import PublishDialog from "../modules/blogs/publish-dialog";
import TranslateService from "@/api/services/translateService";
import { CONSTANTS } from "@/lib/utils";

interface MarkdownEditorProps {
  initialValue?: string;
  hideEdit?: boolean;
  blogData: any;
}

export default function MarkdownEditor({
  hideEdit,
  initialValue,
  blogData,
}: MarkdownEditorProps) {
  const { blogId } = useParams({ from: "/_auth/dashboard/$blogId/edit" });
  const [loadingPublish, setLoadingPublish] = useState(false);
  const navigate = useNavigate();
  const updateBlogMutation = useMutation({
    mutationFn: (translatedRes: any) =>
      BlogService.updateBlog({
        data: {
          content: value,
          ...(translatedRes
            ? {
                transcription: translatedRes,
                is_blog: true,
              }
            : {}),
        },
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

  useEffect(() => {
    setValue(initialValue);
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
        )
          .map((lang) => lang.value)
          .slice(0, 3),
      });
      console.log({ translatedResponse });
      await updateBlogMutation.mutate(translatedResponse?.data ?? []);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to save draft");
      setLoadingPublish(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
      {showEdit && !hideEdit ? (
        <div className="space-y-4">
          <MDEditor
            value={editorValue}
            onChange={handleChange}
            height={300}
            className="border border-gray-300 rounded-lg p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
              !blogData?.data?.is_blog && (
                <Button className="" onClick={onPublish}>
                  Publish
                </Button>
              )}
            <Button
              onClick={() => setShowEdit(true)}
              variant="outline"
              className="bg-transparent "
            >
              <Pen className="mr-2" />
              Edit
            </Button>
          </div>
          <MDEditor.Markdown source={editorValue} />
        </div>
      )}
      {showPublish && (
        <PublishDialog isLoading={loadingPublish} onAction={onConfirmPublish} />
      )}
    </div>
  );
}
