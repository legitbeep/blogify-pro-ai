import { Button } from "@/components/ui/button";
import React from "react";

interface QuickRepliesProps {
  messages: string[];
  onMessageSelect: (message: string) => void;
}

const QuickReplies = (props: QuickRepliesProps) => {
  const { messages, onMessageSelect } = props;
  return (
    <div className="flex gap-2 overflow-x-auto p-4">
      {messages.map((msg, key) => (
        <Button
          key={key}
          size="sm"
          variant="secondary"
          onClick={() => onMessageSelect(msg)}
        >
          {msg}
        </Button>
      ))}
    </div>
  );
};

export default QuickReplies;
