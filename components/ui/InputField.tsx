import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
const InputField = ({
  label,
  id,
  name,
  placeholder,
  onChange,
  error,
  required = false,
  type,
}: {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  type: string;
}) => {
  const [pitch, setPitch] = useState<string>("");
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setPitch(value); 
      if (onChange) {
        onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>); 
      }
    }
  };
  return (
    <div>
      <label htmlFor={id} className="startup-form_label">
        {label}
      </label>
      {type === "input" ? (
        <Input
          id={id}
          name={name}
          onChange={onChange}
          className="startup-form_input"
          required={required}
          placeholder={placeholder}
        />
      ) : type === "textarea" ? (
        <Textarea
          id={id}
          name={name}
          onChange={onChange}
          className="startup-form_textarea"
          required={required}
          placeholder={placeholder}
        />
      ) : (
        <MDEditor
          value={pitch}
          onChange={handleEditorChange}
          id={id}
          preview="edit"
          data-color-mode="light"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:placeholder
          }}
          previewOptions={{
            disallowedElements:["style"],
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      )}
      {error && <p className="startup-form_error">{error}</p>}
    </div>
  );
};

export default InputField;
