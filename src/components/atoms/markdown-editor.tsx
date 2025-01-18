import React, { Dispatch, SetStateAction, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

export default function MarkdownEditor(value: any, setValue: any) {
  const [showEdit, setShowEdit] = useState(false);

  const handleChange = (newValue?: string) => {
    if (newValue !== undefined) {
      setValue(newValue);
    }
  };

  return (
    <div className="container">
      {showEdit ? (
        <MDEditor value={value} onChange={handleChange} />
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
