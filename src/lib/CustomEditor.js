// lib/CustomEditor.js
// import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import ClassicEditorBase from "@ckeditor/ckeditor5-build-classic";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Heading from "@ckeditor/ckeditor5-heading/src/heading";
// import SourceEditing from "@ckeditor/ckeditor5-source-editing";

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  SourceEditing,
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "sourceEditing", // ✅ HTML editing toggle
    ],
  },
  language: "en",
};
