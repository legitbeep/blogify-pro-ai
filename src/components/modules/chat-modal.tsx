import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, Send, Pause, Paperclip, Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LiveAudioVisualizer } from "react-audio-visualize";
import useSpeechToText from "@/hooks/useSpeechToText";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { toast } from "sonner";
import { useThemeStore } from "@/store/useThemeStore";
import ImageUpload from "../atoms/image-upload";
import UploadService from "@/api/services/uploadService";
import axios from "axios";
import useWebSocketDemo from "@/api/hooks/useWebSocketConnection";

interface ChatMessage {
  id: string;
  message: string;
  user_type: "user" | "ai";
  timestamp: Date;
  type: "TEXT" | "AUDIO" | "IMAGE";
  audioUrl?: string;
}

interface MediaRecorderWithData extends MediaRecorder {
  ondataavailable: (event: BlobEvent) => void;
  onstop: () => void;
  onpause: () => void;
  onresume: () => void;
}

const ChatModal = () => {
  const { theme } = useThemeStore();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [message, setMessage] = useState("");
  const [isAttachImage, setIsAttachImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] =
    useState<MediaRecorderWithData | null>(null);
  const [visualizerStream, setVisualizerStream] = useState<MediaStream | null>(
    null
  );

  const [transcriptDone, setTranscriptDone] = useState(false);
  const speechToText = useSpeechToText({
    continuous: true,
    interimResults: true,
    onError: (error) => {
      console.error("Error:", error);
      toast.error("Failed to convert to text!");
    },
    onStopListening: () => {
      setTranscriptDone(true);
    },
  });
  const textToSpeech = useTextToSpeech();

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // const [messages, setMessages] = useState<ChatMessage[]>([
  //   {
  //     id: "1",
  //     content: "Hello! How can I help you today?",
  //     sender: "ai",
  //     timestamp: new Date(),
  //     type: "TEXT",
  //   },
  //   {
  //     id: "2",
  //     content: "I have a question about React",
  //     sender: "user",
  //     timestamp: new Date(),
  //     type: "TEXT",
  //   },
  //   {
  //     id: "3",
  //     content:
  //       "Sure, I'd be happy to help with React. What would you like to know?",
  //     sender: "ai",
  //     timestamp: new Date(),
  //     type: "TEXT",
  //   },
  // ]);

  const mediaRecorderRef = useRef<MediaRecorderWithData | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const timerStartTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioElementsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
  const streamRef = useRef<MediaStream | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const {
    socketUrl,
    messageHistory,
    changeSocketUrl,
    sendTestMessage,
    connectionStatus,
    lastMessage,
  } = useWebSocketDemo();

  useEffect(() => {
    lastMessage &&
      setMessages((prev) => [...prev, JSON.parse(lastMessage.data)]);
    lastMessage && console.log(JSON.parse(lastMessage.data), "last msg");
  }, [lastMessage]);

  // useEffect(() => {
  //   console.log(messages, "new messages");
  // }, [messages]);

  const sendMessage = async (
    message_type: "TEXT" | "AUDIO" | "IMAGE",
    content?: string,
    url?: string
  ) => {
    try {
      const response = await sendTestMessage({
        user_id: "e8205b45-28a6-4bf5-a05b-4528a6fbf53d",
        message_type,
        content,
        url,
      });
      // console.log("Response received:", response);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return stream;
    } catch (err) {
      console.error("Microphone permission denied:", err);
      return null;
    }
  };

  const startTimer = () => {
    if (timerIntervalRef.current) return;

    timerStartTimeRef.current = Date.now() - pausedTimeRef.current * 1000;

    timerIntervalRef.current = window.setInterval(() => {
      if (timerStartTimeRef.current) {
        const elapsedTime = Math.floor(
          (Date.now() - timerStartTimeRef.current) / 1000
        );
        setRecordingTime(elapsedTime);
      }
    }, 100);
  };

  const pauseTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;

      if (timerStartTimeRef.current) {
        pausedTimeRef.current = Math.floor(
          (Date.now() - timerStartTimeRef.current) / 1000
        );
      }
    }
  };

  const resetTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    timerStartTimeRef.current = null;
    pausedTimeRef.current = 0;
    setRecordingTime(0);
  };

  const startRecording = async () => {
    const stream = await requestMicrophonePermission();
    if (!stream) return;

    streamRef.current = stream;
    audioChunksRef.current = [];
    setVisualizerStream(stream);

    speechToText.startListening();

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    }) as MediaRecorderWithData;

    mediaRecorderRef.current = mediaRecorder;
    setMediaRecorder(mediaRecorder);

    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      setVisualizerStream(null);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          message: speechToText?.transcript || "Audio message",
          sender: "user",
          timestamp: new Date(),
          type: speechToText?.transcript ? "TEXT" : "AUDIO",
          audioUrl: URL.createObjectURL(audioBlob),
          user_type: "user",
        },
      ]);
      speechToText.stopListening();
    };

    // Request data every 1 second
    mediaRecorder.start(1000);
    setIsRecording(true);
    setIsPaused(false);
    startTimer();
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
      setIsPaused(false);
      resetTimer();
      audioChunksRef.current = [];
      setMediaRecorder(null);
      setVisualizerStream(null);
      speechToText.cancelListening();
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      pauseTimer();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (message.trim()) {
  //     const newMessage: ChatMessage = {
  //       id: Date.now().toString(),
  //       content: message,
  //       sender: "user",
  //       timestamp: new Date(),
  //       type: "text",
  //     };
  //     setMessages((prev) => [...prev, newMessage]);
  //     setMessage("");

  //     // Simulate AI response
  //     setTimeout(() => {
  //       const aiResponse: ChatMessage = {
  //         id: (Date.now() + 1).toString(),
  //         content: "This is a simulated AI response to your message.",
  //         sender: "ai",
  //         timestamp: new Date(),
  //         type: "text",
  //       };
  //       setMessages((prev) => [...prev, aiResponse]);
  //     }, 1000);
  //   } else if (isRecording) {
  //     // Stop the recording and wait for the data
  //     if (
  //       mediaRecorderRef.current &&
  //       mediaRecorderRef.current.state !== "inactive"
  //     ) {
  //       return new Promise((resolve) => {
  //         speechToText.stopListening();
  //         mediaRecorderRef.current!.onstop = async () => {
  //           const audioBlob = new Blob(audioChunksRef.current, {
  //             type: "audio/webm",
  //           });

  //           // Create and add the audio message
  //           const newMessage: ChatMessage = {
  //             id: Date.now().toString(),
  //             content: "Audio message",
  //             sender: "user",
  //             timestamp: new Date(),
  //             type: "audio",
  //             audioUrl: URL.createObjectURL(audioBlob),
  //           };
  //           setMessages((prev) => [...prev, newMessage]);

  //           // Clean up
  //           if (streamRef.current) {
  //             streamRef.current.getTracks().forEach((track) => track.stop());
  //             streamRef.current = null;
  //           }
  //           resetTimer();
  //           setIsRecording(false);
  //           setIsPaused(false);
  //           audioChunksRef.current = [];
  //           setMediaRecorder(null);
  //           setVisualizerStream(null);

  //           resolve(undefined);
  //         };
  //         mediaRecorderRef.current!.stop();
  //       });
  //     }
  //   }
  // };

  const handleAudioUpload = async (audioBlob: Blob) => {
    try {
      setUploadProgress(0);
      setUploadStatus("Uploading...");

      // Get presigned URL for audio file
      const uploadUrlResponse = await UploadService.getPresignedUrl({
        file_name: "audio_message.webm", // You can name it dynamically based on timestamp or other logic
        file_type: audioBlob.type,
        file_path: "audio", // Set the file path to "audio"
      });

      const uploadUrl = uploadUrlResponse.presigned_url;

      // Upload the file to S3
      await axios.put(uploadUrl, audioBlob, {
        headers: {
          "Content-Type": audioBlob.type,
        },
        onUploadProgress: (progressEvent) => {
          const progress =
            progressEvent.total &&
            Math.round((progressEvent.loaded / progressEvent.total) * 100);
          progress && setUploadProgress(progress);
        },
      });

      setUploadStatus("Upload complete!");
    } catch (error) {
      setUploadStatus("Upload failed.");
      setError("An error occurred while uploading the file.");
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        message: message,
        user_type: "user",
        timestamp: new Date(),
        type: "TEXT",
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      const textMessageResponse = await sendMessage("TEXT", message);
      // console.log(textMessageResponse, "txt msgs");
      // Simulate AI response
      // setTimeout(() => {
      //   const aiResponse: ChatMessage = {
      //     id: (Date.now() + 1).toString(),
      //     content: "This is a simulated AI response to your message.",
      //     sender: "ai",
      //     timestamp: new Date(),
      //     type: "TEXT",
      //   };
      //   setMessages((prev) => [...prev, aiResponse]);
      // }, 1000);
    } else if (isRecording) {
      // Stop the recording and wait for the data
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        return new Promise((resolve) => {
          speechToText.stopListening();
          mediaRecorderRef.current!.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/webm",
            });

            // Create and add the audio message
            const newMessage: ChatMessage = {
              id: Date.now().toString(),
              message: "Audio message",
              user_type: "user",
              timestamp: new Date(),
              type: "AUDIO",
              audioUrl: URL.createObjectURL(audioBlob),
            };
            setMessages((prev) => [...prev, newMessage]);

            // Upload the audio file to presigned URL
            await handleAudioUpload(audioBlob);

            // Clean up
            if (streamRef.current) {
              streamRef.current.getTracks().forEach((track) => track.stop());
              streamRef.current = null;
            }
            resetTimer();
            setIsRecording(false);
            setIsPaused(false);
            audioChunksRef.current = [];
            setMediaRecorder(null);
            setVisualizerStream(null);

            resolve(undefined);
          };
          mediaRecorderRef.current!.stop();
        });
      }
    }
  };

  useEffect(() => {
    if (transcriptDone) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          message: speechToText?.transcriptRef?.current || "Audio message",
          user_type: "user",
          timestamp: new Date(),
          type: speechToText?.transcriptRef?.current ? "TEXT" : "AUDIO",
        },
      ]);
      textToSpeech.speak(
        "I heard you say " + speechToText?.transcriptRef?.current
      );
      setTranscriptDone(false);
    }
  }, [transcriptDone]);

  const handleAudioPlay = (messageId: string, audioUrl: string) => {
    // Stop currently playing audio if any
    if (currentlyPlaying && currentlyPlaying !== messageId) {
      const currentAudio = audioElementsRef.current[currentlyPlaying];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    if (!audioElementsRef.current[messageId]) {
      const audio = new Audio(audioUrl);
      audio.onended = () => setCurrentlyPlaying(null);
      audioElementsRef.current[messageId] = audio;
    }

    const audio = audioElementsRef.current[messageId];

    if (currentlyPlaying === messageId) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      audio.play();
      setCurrentlyPlaying(messageId);
    }
  };

  const handleImageUpload = () => {
    setIsAttachImage(!isAttachImage);
  };

  useEffect(() => {
    return () => {
      resetTimer();
      cancelRecording();
      Object.values(audioElementsRef.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setVisualizerStream(null);
      setMediaRecorder(null);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    try {
      setUploadProgress(0);
      setUploadStatus("Uploading...");

      // Get presigned URL from the server
      const uploadUrlResponse = await UploadService.getPresignedUrl({
        file_name: file.name,
        file_type: file.type,
        file_path: `images`,
      });

      const uploadUrl = uploadUrlResponse.presigned_url;

      // Upload the file to S3
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

      setUploadStatus("Upload complete!");
    } catch (error) {
      setUploadStatus("Upload failed.");
      setError("An error occurred while uploading the file.");
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="lg" variant="secondary" className="h-11 w-full">
          Explore AI
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[100dvh] md:h-[80vh] max-w-2xl p-0">
        <Card className="flex flex-col h-full w-full bg-background border-border">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100dvh-4rem)] md:max-h-[calc(80vh-4rem)]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.user_type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.user_type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.type === "TEXT" ? (
                    <p>{msg.message}</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          msg.audioUrl && handleAudioPlay(msg.id, msg.audioUrl)
                        }
                        className="h-8 w-8"
                      >
                        {currentlyPlaying === msg.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="text-sm">Audio message</span>
                    </div>
                  )}
                  <span className="text-xs opacity-70 mt-1 block">
                    {/* {msg.timestamp.toLocaleTimeString()} */}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              {!isRecording ? (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={startRecording}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={handleImageUpload}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message ChatGPT"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-foreground">
                      {formatTime(recordingTime)}
                    </span>
                  </div>

                  <div className="flex gap-1 w-[150px] items-center mx-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping mr-1" />
                    <span className="text-muted-foreground">Recording</span>
                  </div>

                  <div className="w-full h-full flex justify-center items-center">
                    {mediaRecorder && visualizerStream && (
                      <div className="">
                        <LiveAudioVisualizer
                          mediaRecorder={mediaRecorder}
                          width={200}
                          height={25}
                          barWidth={2}
                          gap={1}
                          barColor={
                            theme == "dark"
                              ? isPaused
                                ? "#666"
                                : "#fff"
                              : isPaused
                                ? "#fff"
                                : "#666"
                          }
                        />
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      isPaused ? resumeRecording() : pauseRecording()
                    }
                    className="text-primary hover:text-primary"
                  >
                    {isPaused ? (
                      <Play className="h-5 w-5" />
                    ) : (
                      <Pause className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={cancelRecording}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </form>
          </div>
          {isAttachImage && (
            <Dialog open={isAttachImage} onOpenChange={setIsAttachImage}>
              <DialogContent className="sm:max-w-[425px]">
                <ImageUpload
                  setError={setError}
                  error={error}
                  uploadProgress={uploadProgress}
                  setUploadStatus={setUploadStatus}
                  uploadStatus={uploadStatus}
                  setFile={setFile}
                  file={file}
                  handleUpload={handleUpload}
                />
              </DialogContent>
            </Dialog>
          )}
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
