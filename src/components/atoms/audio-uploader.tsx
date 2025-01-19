"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadFile } from "@/lib/uploadFile";
import BlogService from "@/api/services/blogService";
import { useNavigate } from "@tanstack/react-router";

interface AudioUploaderProps {
  onUploadComplete: () => void;
}

export function AudioUploader({ onUploadComplete }: AudioUploaderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const navigate = useNavigate();
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.ondataavailable = async (event) => {
        const audioBlob = new Blob([event.data], { type: "audio/webm" });
        await handleUpload(audioBlob);
      };
    }
  };

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
        "audio",
        setUploadProgress,
        setUploadStatus
      );
      const apiResponse: any = await BlogService.createBlog({
        content: res.response,
      });
      onUploadComplete();
      navigate({
        to: `/dashboard/${apiResponse?.id}/edit`,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          id="audio-upload"
        />
        <Button asChild>
          <label htmlFor="audio-upload">Upload Audio</label>
        </Button>
      </div>
      {isRecording && <p>Recording in progress...</p>}
      {uploadStatus && (
        <div>
          <Progress value={uploadProgress} className="w-full" />
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}
