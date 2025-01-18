"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenericFileUploader } from "./genericfile-uploader";
import { VideoUploader } from "./video-uploader";
import { AudioUploader } from "./audio-uploader";
import { ImageUploader } from "./image-uploader";
import { TextInput } from "./text-input";

export function FileUploader() {
  const [isOpen, setIsOpen] = useState(true);

  const handleUploadComplete = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleUploadComplete}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Upload File</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Choose a file type to upload or record.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
          <TabsContent value="video">
            <VideoUploader onUploadComplete={handleUploadComplete} />
          </TabsContent>
          <TabsContent value="audio">
            <AudioUploader onUploadComplete={handleUploadComplete} />
          </TabsContent>
          <TabsContent value="file">
            <GenericFileUploader onUploadComplete={handleUploadComplete} />
          </TabsContent>
          <TabsContent value="text">
            <TextInput onUploadComplete={handleUploadComplete} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
