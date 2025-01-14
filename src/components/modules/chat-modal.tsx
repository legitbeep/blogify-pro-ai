import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Mic,
  Send,
  Pause,
  Calendar,
  Paperclip,
  Globe,
  Play,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type: "text" | "audio";
  audioUrl?: string;
}

interface MediaRecorderWithData extends MediaRecorder {
  ondataavailable: (event: BlobEvent) => void;
  onstop: () => void;
  onpause: () => void;
  onresume: () => void;
}

const ChatModal = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioData, setAudioData] = useState<Blob | null>(null);
  const [message, setMessage] = useState("");
  const [audioPermission, setAudioPermission] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
    {
      id: "2",
      content: "I have a question about React",
      sender: "user",
      timestamp: new Date(),
      type: "text",
    },
    {
      id: "3",
      content:
        "Sure, I'd be happy to help with React. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ]);

  const mediaRecorderRef = useRef<MediaRecorderWithData | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioElementsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
  const streamRef = useRef<MediaStream | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioPermission(true);
      return stream;
    } catch (err) {
      console.error("Microphone permission denied:", err);
      return null;
    }
  };

  const startRecording = async () => {
    const stream = await requestMicrophonePermission();
    if (!stream) return;

    streamRef.current = stream;
    audioChunksRef.current = [];

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    }) as MediaRecorderWithData;

    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      setAudioData(audioBlob);
    };

    // Request data every 1 second
    mediaRecorder.start(1000);
    setIsRecording(true);
    setIsPaused(false);
    startTimer();
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      stopTimer();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsRecording(false);
      setIsPaused(false);
      stopTimer();
      setRecordingTime(0);
      setAudioData(null);
      audioChunksRef.current = [];
    }
  };

  const startTimer = () => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: message,
        sender: "user",
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: "This is a simulated AI response to your message.",
          sender: "ai",
          timestamp: new Date(),
          type: "text",
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    } else if (isRecording) {
      // Stop the recording and wait for the data
      mediaRecorderRef.current?.stop();

      // Wait for the ondataavailable and onstop events to process
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (audioData) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          content: "Audio message",
          sender: "user",
          timestamp: new Date(),
          type: "audio",
          audioUrl: URL.createObjectURL(audioData),
        };
        setMessages((prev) => [...prev, newMessage]);

        // Cleanup
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        setAudioData(null);
        setRecordingTime(0);
        setIsRecording(false);
        setIsPaused(false);
        audioChunksRef.current = [];
      }
    }
  };

  const handleAudioPlay = (messageId: string, audioUrl: string) => {
    // Stop currently playing audio if any
    if (currentlyPlaying && currentlyPlaying !== messageId) {
      const currentAudio = audioElementsRef.current[currentlyPlaying];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    // Play or pause the selected audio
    if (!audioElementsRef.current[messageId]) {
      audioElementsRef.current[messageId] = new Audio(audioUrl);
    }

    const audio = audioElementsRef.current[messageId];

    if (currentlyPlaying === messageId) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      audio.play();
      setCurrentlyPlaying(messageId);

      audio.onended = () => {
        setCurrentlyPlaying(null);
      };
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
      cancelRecording();
      // Cleanup audio elements
      Object.values(audioElementsRef.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="lg" variant="outline" className="h-11">
          Explore AI
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[100dvh] md:h-[80vh] max-w-2xl p-0">
        <Card className="flex flex-col h-full w-full bg-background border-border">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100dvh-4rem)] md:max-h-[calc(80vh-4rem)]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.type === "text" ? (
                    <p>{msg.content}</p>
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
                    {msg.timestamp.toLocaleTimeString()}
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
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message ChatGPT"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Calendar className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-foreground">
                      {formatTime(recordingTime)}
                    </span>
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
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
