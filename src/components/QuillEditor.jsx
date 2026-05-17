'use client';

import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

export default function QuillEditor({ value = '', onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const textareaRef = useRef(null);

  const [isHTMLMode, setIsHTMLMode] = useState(false);

  // ✅ Clean HTML
  const cleanHTML = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    temp.querySelectorAll('style, meta, link, xml, o\\:p').forEach(el => el.remove());

    temp.querySelectorAll('*').forEach(el => {
      el.removeAttribute('style');

      if (el.className?.includes('Mso')) {
        el.removeAttribute('class');
      }

      [...el.attributes].forEach(attr => {
        if (!['href', 'src', 'alt', 'title'].includes(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return DOMPurify.sanitize(temp.innerHTML);
  };

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Write content...',
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ script: 'sub' }, { script: 'super' }],
            [{ color: [] }, { background: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean'],
            ['html'] // ✅ custom button
          ],
          handlers: {
            html: () => {
              toggleHTMLMode();
            }
          }
        }
      }
    });

    quillRef.current = quill;

    // set initial value
    if (value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }

    // on change
    quill.on('text-change', () => {
      if (!isHTMLMode) {
        const html = editorRef.current.querySelector('.ql-editor').innerHTML;
        const cleaned = cleanHTML(html);
        onChange?.(cleaned);
      }
    });

    // image upload
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (data.url) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', data.url);
        }
      };
    });

    // paste handler
    quill.root.addEventListener('paste', (e) => {
      e.preventDefault();

      const html = e.clipboardData.getData('text/html');
      const text = e.clipboardData.getData('text/plain');

      if (html) {
        const cleaned = cleanHTML(html);
        quill.clipboard.dangerouslyPasteHTML(cleaned);
      } else {
        const range = quill.getSelection(true);
        quill.insertText(range.index, text);
      }
    });

  }, []);

  // ✅ Toggle HTML Mode
  const toggleHTMLMode = () => {
    const quill = quillRef.current;
    if (!quill) return;

    if (!isHTMLMode) {
      // switch to HTML mode
      const html = quill.root.innerHTML;
      textareaRef.current.value = html;
      editorRef.current.style.display = 'none';
      textareaRef.current.style.display = 'block';
    } else {
      // back to visual mode
      const html = textareaRef.current.value;
      const cleaned = cleanHTML(html);
      quill.clipboard.dangerouslyPasteHTML(cleaned);
      editorRef.current.style.display = 'block';
      textareaRef.current.style.display = 'none';
      onChange?.(cleaned);
    }

    setIsHTMLMode(!isHTMLMode);
  };

  return (
    <div>
      {/* Quill Editor */}
      <div ref={editorRef} style={{ minHeight: '350px' }} />

      {/* HTML Editor */}
      <textarea
        ref={textareaRef}
        style={{
          display: 'none',
          width: '100%',
          height: '350px',
          fontFamily: 'monospace',
          padding: '10px'
        }}
      />
    </div>
  );
}