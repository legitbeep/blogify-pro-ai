"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadFile } from "@/lib/uploadFile";
import BlogService from "@/api/services/blogService";
import { useNavigate } from "@tanstack/react-router";

interface VideoUploaderProps {
  onUploadComplete: () => void;
}

export function VideoUploader({ onUploadComplete }: VideoUploaderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const navigate = useNavigate();
  const startRecording = async () => {
    try {
      clearPreview();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
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
        const videoBlob = new Blob([event.data], { type: "video/webm" });
        const url = URL.createObjectURL(videoBlob);
        setPreviewUrl(url);
        await handleUpload(videoBlob);
      };
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: Blob) => {
    try {
      const res = await uploadFile(
        file,
        "video",
        setUploadProgress,
        setUploadStatus
      );
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

  const clearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <Button
          className="w-full"
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
        />
        <Button asChild className="w-full">
          <label htmlFor="video-upload">Upload Video</label>
        </Button>
      </div>
      {(isRecording || previewUrl) && (
        <video
          ref={videoRef}
          autoPlay
          muted={isRecording}
          controls={!isRecording}
          className="w-full h-48 bg-black"
          src={previewUrl || undefined}
        />
      )}
      {uploadStatus && (
        <div>
          <Progress value={uploadProgress} className="w-full" />
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}
