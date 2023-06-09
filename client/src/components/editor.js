import "./editor.css";

import Document from '@tiptap/extension-document'
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Node, mergeAttributes } from "@tiptap/core";
import React from "react";
import MenuBar from "./editorToolbar";
import CategoryToolbar from "./editorCategoryToolbar";

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `This book describes teenagers who cheat on driver's license tests by cribbing from test answers sewn into clothing that translates as “flower cloth.” Another part of this book describes doctors' elation at publishing a paper about a novel nosocomial infection. This book attributes the sensitivity of CPS social worker Jeanine Hilt to having to deal with fundamentalist parents while being gay. Yer (“yehr”) slamming a door is thought to have triggered the title (*) condition of this book, which is treated by the tall doctors Neil and Peggy. This book describes how qaug dab peg (kau da pay) is traditionally treated by a txiv neeb (tsi nehng), or shaman, and tells of a family who instead took their daughter to a Merced hospital. For 10 points, name this Anne Fadiman book about the failure of American hospitals to treat Lia Lee, an epileptic Hmong child.`,
  });

  const answerlineEditor = useEditor({
    extensions: [
      Answerline,
      AnswerlineInstruction,
      StarterKit.configure({
        document: false,
      }),
      Underline,
    ],
    content: `
        <h1>
          It’ll always have a heading …
        </h1>
        <p>
          … if you pass a custom document. That’s the beauty of having full control over the schema.
        </p>
      `,
  });

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <strong>B</strong>
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <u>U</u>
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Comment
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Add PG
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
      <CategoryToolbar editor={editor} />
    </div>
  );
}
