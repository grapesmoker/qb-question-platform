import "./editor.css";

import Document from "@tiptap/extension-document";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Node, mergeAttributes } from "@tiptap/core";
import React from "react";
import MenuBar from "./editorToolbar";
import CategoryToolbar from "./editorCategoryToolbar";
import CharacterCount from '@tiptap/extension-character-count'

const Answerline = Document.extend({
  content: "answerlineinstruction+",
});

const AnswerlineInstruction = Node.create({
  name: "answerlineinstruction",

  addOptions() {
    return {
      levels: ["accept", "prompt", "reject"],
      HTMLAttributes: {},
    };
  },

  content: "inline*",

  group: "block",

  defining: true,

  addAttributes() {
    return {
      level: {
        default: "accept",
        rendered: false,
      },
    };
  },

  parseHTML() {
    return this.options.levels.map((level) => ({
      tag: `${level}`,
      attrs: { level },
    }));
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.setNode(this.name, attributes);
        },
      toggleHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.toggleNode(this.name, "paragraph", attributes);
        },
    };
  },
});

const characterLimit = 900

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ 
        HTMLAttributes: {
          class: 'pronunciation-guide',
        },
        multicolor: true }),
        CharacterCount.configure({
          limit: characterLimit
        })
    ],
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
      Highlight,
    ],
    content: ``,
  });

  return (
    <div className="editor-container">
      <MenuBar editor={editor} limit = {characterLimit} />
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
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHighlight()
                .run()
            }
          >
            Add PG
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
      <div className="answerline">
        <span>ANSWER:</span>
        <EditorContent
          className="answerline-editor"
          editor={answerlineEditor}
        />
      </div>
      <CategoryToolbar editor={editor} />
    </div>
  );
}
