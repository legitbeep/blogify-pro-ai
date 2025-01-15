import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface UseWebSocketDemoReturn {
  socketUrl: string;
  messageHistory: MessageEvent[];
  changeSocketUrl: (newUrl: string) => void;
  sendTestMessage: () => void;
  connectionStatus: string;
  lastMessage: MessageEvent | null;
  readyState: ReadyState;
}

const useWebSocketDemo = (
  initialUrl: string = "wss://echo.websocket.org"
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
    () => sendMessage("Hello"),
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
