import React, { Dispatch, SetStateAction, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import { Pen, Save } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function MarkdownEditor({
  value,
  setValue,
}: MarkdownEditorProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [editorValue, setEditorValue] = useState(value);

  const handleSave = () => {
    setValue(editorValue); // Save the changes to the parent state
    setShowEdit(false); // Switch back to preview state
  };

  const handleCancel = () => {
    setEditorValue(value); // Revert to the original value
    setShowEdit(false); // Switch back to preview state
  };

  const handleChange = (newValue?: string) => {
    if (newValue !== undefined) {
      setEditorValue(newValue); // Update the local editor state
    }
  };

  return (
    <div className="container">
      {showEdit ? (
        <div>
          <MDEditor value={editorValue} onChange={handleChange} />
          <div className="flex gap-2 mt-2">
            <Button onClick={handleSave}>
              <Save />
              Save
            </Button>
            <Button onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <MDEditor.Markdown
            source={value}
            style={{ whiteSpace: "pre-wrap" }}
          />
          <Button onClick={() => setShowEdit(true)}>
            <Pen />
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
