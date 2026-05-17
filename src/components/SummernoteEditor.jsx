'use client';

import { useEffect, useRef, useId } from 'react';

export default function SummernoteEditor({ value = '', onChange }) {
  const editorRef = useRef(null);
  const editorId = useId();

  // ✅ Word HTML Cleaner
  const cleanWordHTML = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    temp.querySelectorAll('o\\:p, xml, style, meta, link').forEach(el => el.remove());

    // remove comments
    const removeComments = (node) => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 8) child.remove();
        else removeComments(child);
      });
    };
    removeComments(temp);

    temp.querySelectorAll('*').forEach(el => {
      el.removeAttribute('style');

      if (el.className?.includes('Mso')) {
        el.removeAttribute('class');
      }

      // keep only useful attributes
      [...el.attributes].forEach(attr => {
        if (!['href', 'src', 'alt', 'title'].includes(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });
    });

    // remove empty spans
    temp.querySelectorAll('span').forEach(el => {
      if (!el.attributes.length) {
        el.replaceWith(...el.childNodes);
      }
    });

    return temp.innerHTML;
  };

  useEffect(() => {
    let isMounted = true;

    // ✅ Load script safely
    const loadScript = (src) =>
      new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.body.appendChild(script);
      });

    const loadCSS = (href) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    // ✅ wait until jQuery fully ready
    const waitForjQuery = () =>
      new Promise((resolve) => {
        const check = () => {
          if (window.$ && window.$.fn) return resolve();
          setTimeout(check, 50);
        };
        check();
      });

    const init = async () => {
      if (!isMounted) return;

      // CSS
      loadCSS('https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.css');

      // jQuery
      if (!window.$) {
        await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
      }

      await waitForjQuery();

      // Summernote
      if (!window.$.fn.summernote) {
        await loadScript(
          'https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.js'
        );
      }

      const $ = window.$;

      // ❌ prevent duplicate init
      if ($(editorRef.current).next('.note-editor').length) return;

      $(editorRef.current).attr('id', editorId);

      $(editorRef.current).summernote({
        height: 350,
        placeholder: 'Write content...',
        tabsize: 2,

        // 🔥 FULL TOOLBAR
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
          ['fontname', ['fontname']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph', 'height']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video', 'hr']],
          ['view', ['fullscreen', 'codeview', 'help']],
          ['history', ['undo', 'redo']]
        ],

        callbacks: {
          onChange: function (contents) {
            const cleaned = cleanWordHTML(contents);
            onChange?.(cleaned);
          },

          // ✅ Image Upload
          onImageUpload: async function (files) {
            const formData = new FormData();
            formData.append('file', files[0]);

            const res = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });

            const data = await res.json();

            if (data.url) {
              $(editorRef.current).summernote('insertImage', data.url);
            }
          },

          // ✅ Word paste clean
          onPaste: function (e) {
            e.preventDefault();

            const html = (e.originalEvent || e).clipboardData.getData('text/html');
            const text = (e.originalEvent || e).clipboardData.getData('text/plain');

            if (html) {
              const cleaned = cleanWordHTML(html);
              $(editorRef.current).summernote('pasteHTML', cleaned);
            } else {
              document.execCommand('insertText', false, text);
            }
          }
        }
      });

      // set initial value
      $(editorRef.current).summernote('code', value);
    };

    init();

    return () => {
      isMounted = false;
      if (window.$ && editorRef.current) {
        try {
          window.$(editorRef.current).summernote('destroy');
        } catch {}
      }
    };
  }, []);

  return <div ref={editorRef} />;
}