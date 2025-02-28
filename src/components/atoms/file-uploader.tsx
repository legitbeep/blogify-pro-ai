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
          <DialogTitle className="text-2xl font-bold">
            Select file to upload
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Choose the type of file you want to upload and proceed with the
            upload process.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
          <TabsContent value="video" className="mt-4">
            <VideoUploader onUploadComplete={handleUploadComplete} />
          </TabsContent>
          <TabsContent value="audio" className="mt-4">
            <AudioUploader onUploadComplete={handleUploadComplete} />
          </TabsContent>
          <TabsContent value="file" className="mt-4">
            <GenericFileUploader onUploadComplete={handleUploadComplete} />
          </TabsContent>
          <TabsContent value="text" className="mt-4">
            <TextInput onUploadComplete={handleUploadComplete} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
