import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface UseWebSocketDemoReturn {
  socketUrl: string;
  messageHistory: MessageEvent[];
  changeSocketUrl: (newUrl: string) => void;
  sendTestMessage: (text: string | object) => void;
  connectionStatus: string;
  lastMessage: MessageEvent | null;
  readyState: ReadyState;
}

const useWebSocketDemo = (
  initialUrl: string = "wss://api.sma-backend.projects.krishnajalan.dev:25565/api"
): UseWebSocketDemoReturn => {
  const [socketUrl, setSocketUrl] = useState<string>(initialUrl);
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  const changeSocketUrl = useCallback(
    (newUrl: string) => setSocketUrl(newUrl),
    []
  );

  const sendTestMessage = useCallback(
    async (data: string | object) => {
      const message = typeof data === "object" ? JSON.stringify(data) : data;
      const response = await sendMessage(message);
      return response;
    },
    [sendMessage]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return {
    socketUrl,
    messageHistory,
    changeSocketUrl,
    sendTestMessage,
    connectionStatus,
    lastMessage,
    readyState,
  };
};

export default useWebSocketDemo;
