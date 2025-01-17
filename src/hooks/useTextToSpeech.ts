import { useState, useEffect, useCallback } from "react";

interface SpeechOptions {
  voice?: SpeechSynthesisVoice;
  pitch?: number;
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

interface UseTextToSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  voices: SpeechSynthesisVoice[];
}

export const useTextToSpeech = (
  options: SpeechOptions = {}
): UseTextToSpeechReturn => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Check if speech synthesis is supported
  useEffect(() => {
    setIsSupported("speechSynthesis" in window);
  }, []);

  // Load available voices
  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) {
        options.onError?.("Speech synthesis is not supported in this browser");
        return;
      }

      if (!text) {
        options.onError?.("No text provided");
        return;
      }

      // Cancel any ongoing speech
      stop();

      try {
        const utterance = new SpeechSynthesisUtterance(text);

        // Apply options
        if (options.voice) utterance.voice = options.voice;
        else if (voices.length) {
          const voice = voices.find((voice) => voice.lang === "en-IN");
          if (voice) utterance.voice = voice;
          else utterance.voice = voices[0];
        }
        utterance.pitch = options.pitch ?? 1.0;
        utterance.rate = options.rate ?? 0.7;

        // Set up event handlers
        utterance.onstart = () => {
          setIsSpeaking(true);
          options.onStart?.();
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          options.onEnd?.();
        };

        utterance.onerror = (event) => {
          setIsSpeaking(false);
          options.onError?.(event);
        };

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        setIsSpeaking(false);
        options.onError?.(error);
      }
    },
    [isSupported, options, stop]
  );

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    voices,
  };
};
