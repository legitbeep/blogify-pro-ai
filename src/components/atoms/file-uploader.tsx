"use client";

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

export function FileUploader({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) {
  const handleUploadComplete = () => {
    onClose(); // Trigger the parent component's close handler
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Choose a file type to upload or record.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
          <TabsContent value="video">
            <VideoUploader onUploadComplete={handleUploadComplete} />
          </TabsContent>
          <TabsContent value="audio">
            <AudioUploader onUploadComplete={handleUploadComplete} />
          </TabsContent>
          <TabsContent value="image">
            <ImageUploader onUploadComplete={handleUploadComplete} />
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
