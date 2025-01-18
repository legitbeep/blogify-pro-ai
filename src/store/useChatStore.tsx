// store/useChatStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ChatMessage } from "@/types/chat";
import UploadService from "@/api/services/uploadService";

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  currentlyPlayingAudio: string | null;
  error: string | null;
  uploadProgress: number;

  // Message Actions
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  deleteMessage: (id: string) => void;
  clearMessages: () => void;

  // Audio Actions
  setCurrentlyPlayingAudio: (messageId: string | null) => void;
  handleAudioPlay: (messageId: string, audioUrl: string) => void;
  uploadAudioMessage: (blob: Blob, transcript?: string) => Promise<void>;

  // Image Actions
  uploadImageMessage: (file: File) => Promise<void>;

  // UI State Actions
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setUploadProgress: (progress: number) => void;
}

const DEFAULT_AI_MESSAGE: ChatMessage = {
  id: "-1",
  message: "Hi, how can I help you?",
  timestamp: new Date(),
  user_type: "ai",
  type: "TEXT",
};

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
        messages: [DEFAULT_AI_MESSAGE],
        isLoading: false,
        currentlyPlayingAudio: null,
        error: null,
        uploadProgress: 0,

        // Message Actions
        addMessage: (message) =>
          set((state) => ({
            messages: [...state.messages, message],
          })),

        updateMessage: (id, updates) =>
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === id ? { ...msg, ...updates } : msg
            ),
          })),

        deleteMessage: (id) =>
          set((state) => ({
            messages: state.messages.filter((msg) => msg.id !== id),
          })),

        clearMessages: () => set({ messages: [DEFAULT_AI_MESSAGE] }),

        // Audio Actions
        setCurrentlyPlayingAudio: (messageId) =>
          set({ currentlyPlayingAudio: messageId }),

        handleAudioPlay: (messageId, audioUrl) => {
          const { currentlyPlayingAudio, setCurrentlyPlayingAudio } = get();
          const audioElements: { [key: string]: HTMLAudioElement } = {};

          // Stop currently playing audio if any
          if (currentlyPlayingAudio && currentlyPlayingAudio !== messageId) {
            const currentAudio = audioElements[currentlyPlayingAudio];
            if (currentAudio) {
              currentAudio.pause();
              currentAudio.currentTime = 0;
            }
          }

          if (!audioElements[messageId]) {
            const audio = new Audio(audioUrl);
            audio.onended = () => setCurrentlyPlayingAudio(null);
            audioElements[messageId] = audio;
          }

          const audio = audioElements[messageId];

          if (currentlyPlayingAudio === messageId) {
            audio.pause();
            setCurrentlyPlayingAudio(null);
          } else {
            audio.play();
            setCurrentlyPlayingAudio(messageId);
          }
        },

        uploadAudioMessage: async (blob, transcript) => {
          try {
            set({ isLoading: true, error: null });
            const url = await UploadService.uploadAudio(blob);

            const newMessage: ChatMessage = {
              id: Date.now().toString(),
              message: transcript || "Audio message",
              user_type: "user",
              timestamp: new Date(),
              type: "AUDIO",
              audioUrl: url ?? "",
            };

            get().addMessage(newMessage);
          } catch (error) {
            set({ error: "Failed to upload audio message" });
          } finally {
            set({ isLoading: false });
          }
        },

        // Image Actions
        uploadImageMessage: async (file) => {
          try {
            set({ isLoading: true, error: null });
            const url = await UploadService.uploadFile(file);

            const newMessage: ChatMessage = {
              id: Date.now().toString(),
              message: "Image message",
              user_type: "user",
              timestamp: new Date(),
              type: "IMAGE",
              imageUrl: url ?? "",
            };

            get().addMessage(newMessage);
          } catch (error) {
            set({ error: "Failed to upload image" });
          } finally {
            set({ isLoading: false });
          }
        },

        // UI State Actions
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        setUploadProgress: (progress) => set({ uploadProgress: progress }),
      }),
      {
        name: "chat-storage",
        partialize: (state) => ({ messages: state.messages }), // Only persist messages
      }
    )
  )
);
