import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";

import axios from "axios";
import UploadService from "@/api/services/uploadService";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

interface ImageUploadProps {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setUploadStatus: React.Dispatch<React.SetStateAction<string>>;
  uploadStatus: string;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  file: File | null;
  handleUpload: () => void;
  uploadProgress: number;
  error: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  setError,
  setUploadStatus,
  uploadStatus,
  setFile,
  file,
  handleUpload,
  uploadProgress,
  error,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      setUploadStatus("");
      const selectedFile = acceptedFiles[0];

      if (!selectedFile) return;

      if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB limit.");
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    },
    [setError, setUploadStatus, setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    maxFiles: 1,
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-gray-300 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="mx-auto max-h-48 object-contain mb-4"
            />
          ) : (
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
          )}
          <p className="text-sm text-gray-600 mt-2">
            {isDragActive
              ? "Drop the image here"
              : "Drag 'n' drop an image here, or click to select"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPEG, PNG, GIF (max 5MB)
          </p>
        </div>

        {error && (
          <div className="flex items-center mt-4 text-red-500">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {file && !error && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            {uploadProgress === 100 && (
              <div className="flex items-center mt-2 text-green-500">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <p className="text-sm">{uploadStatus}</p>
              </div>
            )}
          </div>
        )}

        <Button
          className="w-full mt-4"
          disabled={!file || !!error || uploadProgress > 0}
          onClick={handleUpload}
        >
          {file ? "Upload Image" : "Select Image"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
