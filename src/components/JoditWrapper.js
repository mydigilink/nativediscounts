"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function JoditWrapper({ value, onChange }) {
  const editor = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/jodit@latest/build/jodit.min.css";
    document.head.appendChild(link);
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      placeholder: "Start typing...",
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(content) => onChange(content)}
    />
  );
}
