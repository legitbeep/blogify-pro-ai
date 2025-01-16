import { useState, useEffect, useCallback, useRef } from "react";
// Add type declarations for the Web Speech API
// interface Window {
//   webkitSpeechRecognition: any;
//   SpeechRecognition: any;
// }

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface UseSpeechToTextOptions {
  continuous?: boolean;
  interimResults?: boolean;
  onStartListening?: () => void;
  onStopListening?: () => void;
  onError?: (error: string) => void;
  onResult?: (result: string) => void;
}

interface UseSpeechToTextReturn {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  cancelListening: () => void;
  transcriptRef: React.MutableRefObject<string>;
}

const useSpeechToText = (
  options: UseSpeechToTextOptions = {}
): UseSpeechToTextReturn => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const transcriptRef = useRef<string>("");

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Type assertion to access the speech recognition properties
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();

        // Configure recognition
        recognitionInstance.continuous = options.continuous ?? true;
        recognitionInstance.interimResults = options.interimResults ?? true;
        recognitionInstance.lang = "en-US";

        recognitionInstance.onstart = () => {
          setIsListening(true);
          options.onStartListening?.();
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
          options.onStopListening?.();
        };

        recognitionInstance.onerror = (event: any) => {
          setIsListening(false);
          options.onError?.(event.error);
        };

        recognitionInstance.onresult = (event: any) => {
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              setTranscript(transcript);
              transcriptRef.current = transcript;
            }
          }

          if (finalTranscript) {
            setTranscript(finalTranscript);
            transcriptRef.current = finalTranscript;
            options.onResult?.(finalTranscript);
          }
        };

        setRecognition(recognitionInstance);
        setIsSupported(true);
      } else {
        setIsSupported(false);
      }
    }
  }, [options.continuous, options.interimResults]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.error("Error starting recognition:", error);
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  const cancelListening = useCallback(() => {
    if (recognition) {
      recognition.abort();
    }
  }, [recognition]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (recognition && isListening) {
        recognition.stop();
      }
    };
  }, [recognition, isListening]);

  return {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    cancelListening,
    transcriptRef,
  };
};

export default useSpeechToText;
