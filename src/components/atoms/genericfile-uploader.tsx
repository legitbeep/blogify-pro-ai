"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadFile } from "@/lib/uploadFile";
import BlogService from "@/api/services/blogService";
import { useNavigate } from "@tanstack/react-router";

interface GenericFileUploaderProps {
  onUploadComplete: () => void;
}

export function GenericFileUploader({
  onUploadComplete,
}: GenericFileUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: Blob) => {
    try {
      const res = await uploadFile(
        file,
        "file",
        setUploadProgress,
        setUploadStatus
      );
      console.log({ res });
      const apiResponse = await BlogService.createBlog({
        content: res.response,
      });
      onUploadComplete();
      navigate({
        to: `/dashboard/${apiResponse}/edit`,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".txt,.pdf"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <Button asChild className="w-full">
        <label htmlFor="file-upload">Upload File (TXT or PDF)</label>
      </Button>
      {uploadStatus && (
        <div>
          <Progress value={uploadProgress} className="w-full" />
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}
