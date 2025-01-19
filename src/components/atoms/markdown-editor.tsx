import React, { Dispatch, SetStateAction, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import { Pen, Save } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  hideEdit?: boolean;
}

export default function MarkdownEditor({
  value,
  setValue,
  hideEdit,
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
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
      {showEdit && !hideEdit ? (
        <div className="space-y-4">
          <MDEditor
            value={editorValue}
            onChange={handleChange}
            height={300}
            className="border border-gray-300 rounded-lg p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleSave}
              variant="default"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <Save className="mr-2" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="secondary"
              className="bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <MDEditor.Markdown source={editorValue} />
          <div className="flex justify-end">
            <Button
              onClick={() => setShowEdit(true)}
              variant="outline"
              className="bg-transparent text-blue-500 hover:bg-blue-50"
            >
              <Pen className="mr-2" />
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
