"use client";

import { useEffect, useRef } from "react";

export default function JoditCDNEditor({
  value = "",
  onChange,
  onBlur,
}) {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  const onChangeRef = useRef(onChange);
  const onBlurRef = useRef(onBlur);

  const lastValue = useRef(value);

  // Keep latest callbacks
  useEffect(() => {
    onChangeRef.current = onChange;
    onBlurRef.current = onBlur;
  }, [onChange, onBlur]);

  useEffect(() => {
    // ✅ Load CSS once
    if (!document.querySelector("[data-jodit-css]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/jodit@latest/build/jodit.min.css";
      link.setAttribute("data-jodit-css", "true");
      document.head.appendChild(link);
    }
const init = () => {
  if (!window.Jodit || !textareaRef.current) return;

  editorRef.current = new window.Jodit(textareaRef.current, {
    height: 500,

    toolbarSticky: true,
    toolbarAdaptive: false,

    askBeforePasteHTML: false, // disable popup
    processPasteHTML: true,
    defaultActionOnPaste: "insert_as_html",

    cleanHTML: {
      removeEmptyElements: true,
      fillEmptyParagraph: false,
    },

  
    // ✅ FULL TOOLBAR
    buttons: [
      "source", "|",
      "cut", "copy", "paste", "pasteStorage", "|",
      "undo", "redo", "|",
      "bold", "italic", "underline", "strikethrough", "|",
      "superscript", "subscript", "|",
      "font", "fontsize", "brush", "paragraph", "|",
      "forecolor", "backcolor", "|",
      "align", "outdent", "indent", "|",
      "ul", "ol", "|",
      "link", "image", "video", "file", "table", "|",
      "hr", "symbol", "emoji", "|",
      "eraser", "copyformat", "|",
      "find", "selectall", "|",
      "preview", "print", "|",
      "fullsize", "about"
    ],

    // ✅ Font options
    controls: {
      font: {
        list: {
          "Arial": "Arial, sans-serif",
          "Verdana": "Verdana, sans-serif",
          "Tahoma": "Tahoma, sans-serif",
          "Times New Roman": "Times New Roman, serif",
          "Georgia": "Georgia, serif",
          "Courier New": "Courier New, monospace"
        }
      },
      fontsize: {
        list: [8, 10, 12, 14, 16, 18, 24, 32, 48]
      }
    },

    // ✅ Upload config
    uploader: {
      insertImageAsBase64URI: true
    }
  });

  // ✅ STRONG CLEANER (works 100%)
  const cleanHTML = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;

    const walker = document.createTreeWalker(temp, NodeFilter.SHOW_ELEMENT, null);

    while (walker.nextNode()) {
      const el = walker.currentNode;

      // ❌ remove all attributes
      [...el.attributes].forEach(attr => {
        el.removeAttribute(attr.name);
      });
    }

    // ❌ remove empty spans
    temp.querySelectorAll("span").forEach(span => {
      if (!span.attributes.length) {
        span.replaceWith(...span.childNodes);
      }
    });

    return temp.innerHTML;
  };

  // ✅ MAIN FIX (THIS IS IMPORTANT)
  editorRef.current.events.on("beforePasteInsert", (html) => {
    return cleanHTML(html);
  });

  // value
  editorRef.current.value = value || "";

  editorRef.current.events.on("change", (content) => {
    lastValue.current = content;
    onChangeRef.current?.(content);
  });

  editorRef.current.events.on("blur", () => {
    onBlurRef.current?.(editorRef.current.value);
  });
};
    const init__ = () => {
  if (!window.Jodit || !textareaRef.current) return;

  editorRef.current = new window.Jodit(textareaRef.current, {
    height: 500,

    // UI
    toolbarSticky: false,
    toolbarAdaptive: false,

    // ✅ Enable Jodit internal paste system
    askBeforePasteHTML: true,
    processPasteHTML: true,
    memorizeChoiceWhenPasteFragment: false,
    nl2brInPlainText: true,

    // ✅ Paste options (same as your file)
    pasteHTMLActionList: [
      { value: "insert_as_html", text: "Keep Formatting" },
      { value: "insert_as_text", text: "Insert as Text" },
      { value: "insert_only_text", text: "Clean Text" },
    ],

    defaultActionOnPaste: "insert_as_html",

    // Cleaning
    cleanHTML: {
      removeEmptyElements: false,
      fillEmptyParagraph: false,
    },

    // Toolbar
    buttons: [
      "source", "|",
      "bold", "italic", "underline", "strikethrough",
      "|",
      "ul", "ol", "outdent", "indent",
      "|",
      "font", "fontsize", "brush",
      "|",
      "align", "|",
      "link", "image", "video", "table",
      "|",
      "undo", "redo",
      "|",
      "fullsize",
    ],
  });

  // ✅ Set initial value
  editorRef.current.value = value || "";

  // ✅ Change event
  editorRef.current.events.on("change", (content) => {
    lastValue.current = content;
    onChangeRef.current?.(content);
  });

  // ✅ Blur event
  editorRef.current.events.on("blur", () => {
    onBlurRef.current?.(editorRef.current.value);
  });


      // ✅ Paste handling (same behavior you're targeting)
      editorRef.current.events.on("beforePaste", (event) => {
        const clipboard = event.clipboardData || window.clipboardData;
        const html = clipboard?.getData("text/html");
        const text = clipboard?.getData("text/plain");

        const keep = window.confirm(
          "Keep formatting?\n\nOK = Yes\nCancel = Clean"
        );

        if (keep) {
          event.html = html || text;
        } else {
          event.html = (text || "").replace(/\n/g, "<br>");
        }
      });
    };

    // Load script once
    if (window.Jodit) {
      init();
    } else {
      let script = document.querySelector("[data-jodit-script]");

      if (!script) {
        script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/jodit@latest/build/jodit.min.js";
        script.async = true;
        script.setAttribute("data-jodit-script", "true");
        document.body.appendChild(script);
      }

      script.addEventListener("load", init);
    }

    return () => {
      editorRef.current?.destruct();
      editorRef.current = null;
    };
  }, []);

  // ✅ External value sync (important for API data)
  useEffect(() => {
    if (editorRef.current && value !== lastValue.current) {
      editorRef.current.value = value || "";
    }
  }, [value]);

  return <textarea ref={textareaRef} />;
}