"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { uploadFile } from "@/lib/uploadFile";

interface TextInputProps {
  onUploadComplete: () => void;
}

export function TextInput({ onUploadComplete }: TextInputProps) {
  const [text, setText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleUpload = async () => {
    if (text) {
      const blob = new Blob([text], { type: "text/plain" });
      try {
        await uploadFile(blob, "text", setUploadProgress, setUploadStatus);
        onUploadComplete();
      } catch (error) {
        console.error("Upload failed:", error);
        setUploadStatus("Upload failed");
      }
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Type your text here..."
        value={text}
        onChange={handleTextChange}
      />
      <Button onClick={handleUpload}>Upload Text</Button>
      {uploadStatus && (
        <div>
          <Progress value={uploadProgress} className="w-full" />
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}
