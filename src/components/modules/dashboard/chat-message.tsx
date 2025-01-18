import { Button } from "@/components/ui/button";
import { ChatMessageType } from "@/types/chat";
import { Pause, Play } from "lucide-react";
import React from "react";

interface ChatMessageProps {
  msg: ChatMessageType;
  currentlyPlaying: string | null;
  setCurrentlyPlaying: React.Dispatch<React.SetStateAction<string | null>>;
  audioElementsRef: React.MutableRefObject<{ [key: string]: HTMLAudioElement }>;
}

const ChatMessage = ({
  msg,
  currentlyPlaying,
  setCurrentlyPlaying,
  audioElementsRef,
}: ChatMessageProps) => {
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
  return (
    <div
      key={msg.id}
      className={`flex ${msg.user_type === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-3 py-1 flex items-center min-h-10 ${
          msg.user_type === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {msg.message_type === "TEXT" ? (
          <p>{msg.content}</p>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => msg.url && handleAudioPlay(msg.id, msg.url)}
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
  );
};

export default ChatMessage;
