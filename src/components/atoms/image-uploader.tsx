"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadFile } from "@/lib/uploadFile";

interface ImageUploaderProps {
  onUploadComplete: () => void;
}

export function ImageUploader({ onUploadComplete }: ImageUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");

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
      await uploadFile(file, "image", setUploadProgress, setUploadStatus);
      onUploadComplete();
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <Button asChild>
        <label htmlFor="image-upload">Upload Image</label>
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
