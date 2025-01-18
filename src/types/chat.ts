export interface ChatMessage {
  id: string;
  message: string;
  user_type: "user" | "ai";
  timestamp: Date;
  type: "TEXT" | "AUDIO" | "IMAGE";
  audioUrl?: string;
  imageUrl?: string;
}

export interface ChatMessageType {
  timestamp: Date;
  user_id: string;
  message_type: "TEXT" | "AUDIO" | "IMAGE";
  content: string;
  url?: string;
  user_type: "user" | "ai";
  id: string;
}
