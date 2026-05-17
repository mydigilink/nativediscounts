"use client";

import { useEffect, useState } from "react";

export default function CKEditorWrapper({ value = "", onChange }) {
  const [Editor, setEditor] = useState(null);
  const [ClassicEditor, setClassicEditor] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadEditor() {
      const ckeditorModule = await import("@ckeditor/ckeditor5-react");
      const classicModule = await import("@ckeditor/ckeditor5-build-classic");

      if (!mounted) return;

      setEditor(() => ckeditorModule.CKEditor);
      setClassicEditor(() => classicModule.default);
    }

    loadEditor();

    return () => {
      mounted = false;
    };
  }, []);

  if (!Editor || !ClassicEditor) {
    return <div className="p-2 text-muted">Loading editor…</div>;
  }

  return (
    <Editor
      editor={ClassicEditor}
      data={value}
      config={{
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "|",
          "alignment",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "blockQuote",
          "codeBlock",
          "|",
          "link",
          "imageUpload",
          "insertTable",
          "|",
          "undo",
          "redo",
        ],
        alignment: {
          options: ["left", "center", "right", "justify"],
        },
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
