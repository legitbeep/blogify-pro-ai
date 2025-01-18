import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { redirect, useNavigate } from "@tanstack/react-router";
import BlogService from "@/api/services/blogService";

interface TextInputProps {
  onUploadComplete: () => void;
}

export function TextInput({ onUploadComplete }: TextInputProps) {
  const [text, setText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const uploadMutation = useMutation({
    mutationFn: async (textContent: string) => {
      const apiResponse = await BlogService.createBlog({
        content: textContent,
      });
      return apiResponse;
    },
    onSuccess: (res) => {
      navigate({
        to: `/dashboard/${res}/edit`,
      });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      setUploadProgress(0);
    },
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleUpload = () => {
    if (!text) return;
    uploadMutation.mutate(text);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Type your text here..."
        value={text}
        onChange={handleTextChange}
        className="min-h-32"
        disabled={uploadMutation.isPending}
      />
      <Button
        onClick={handleUpload}
        disabled={!text || uploadMutation.isPending}
        className="w-full"
      >
        {uploadMutation.isPending ? "Uploading..." : "Upload Text"}
      </Button>
      {(uploadMutation.isPending || uploadMutation.isSuccess) && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-gray-600">
            {uploadMutation.isPending && "Uploading..."}
            {uploadMutation.isSuccess && "Upload complete"}
          </p>
        </div>
      )}
      {uploadMutation.isError && (
        <p className="text-sm text-red-600">Upload failed. Please try again.</p>
      )}
    </div>
  );
}
