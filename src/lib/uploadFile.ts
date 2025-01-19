import TranscriptService from "@/api/services/transcriptService";
import TranslateService from "@/api/services/translateService";
import UploadService from "@/api/services/uploadService";
import axios from "axios";

export const uploadFile = async (
  file: Blob,
  fileType: "video" | "audio" | "image" | "file" | "text",
  setUploadProgress: (progress: number) => void,
  setUploadStatus: (status: string) => void
) => {
  try {
    setUploadProgress(0);
    setUploadStatus("Uploading...");

    const fileExtension = file.type.split("/")[1] || "bin";
    const fileName = `${fileType}_${Date.now()}.${fileExtension}`;

    const uploadUrlResponse = await UploadService.getPresignedUrl({
      file_name: fileName,
      file_type: file.type,
      file_path: fileType,
    });

    const uploadUrl = uploadUrlResponse.presigned_url;

    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progressEvent) => {
        const progress =
          progressEvent.total &&
          Math.round((progressEvent.loaded / progressEvent.total) * 100);
        progress && setUploadProgress(progress);
      },
    });

    setUploadStatus("Upload complete. Processing...");

    let transcriptData: any = {};

    if (fileType === "video") {
      transcriptData.media_file_url = uploadUrl.split("?")[0];
      transcriptData.media_format = "mp4";
    } else if (fileType === "audio") {
      transcriptData.file_url = uploadUrl.split("?")[0];
      transcriptData.media_format = "mp3";
    } else if (fileType === "text") {
      transcriptData.text = await file.text();
      const transcriptResponse =
        await TranscriptService.getTranscriptData(transcriptData);
      setUploadStatus("Processing complete!");
      return transcriptResponse;
    } else if (fileType === "file") {
      transcriptData.file_url = uploadUrl.split("?")[0];
      transcriptData.media_format = "pdf";
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }

    const transcriptResponse =
      await TranscriptService.getTranscriptData(transcriptData);
    setUploadStatus("Processing complete!");

    const translateResponse = await TranslateService.getTranslateData({
      text: transcriptResponse.response,
      source_language_code: "en",
      target_language_code: ["hi"],
    });

    return translateResponse;
  } catch (error) {
    setUploadStatus("Upload or processing failed.");
    console.error(error);
    throw error;
  }
};
