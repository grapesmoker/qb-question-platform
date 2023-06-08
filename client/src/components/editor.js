import "./editor.css";

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import { Node } from '@tiptap/core';
import React from 'react'
import MenuBar from "./editorToolbar";
import CategoryToolbar from "./editorCategoryToolbar";

const PgNode = Node.create({
  // Your code here
})


export default function Editor(){
  const editor = useEditor({
    extensions: [
      PgNode,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: `This book describes teenagers who cheat on driver's license tests by cribbing from test answers sewn into clothing that translates as “flower cloth.” Another part of this book describes doctors' elation at publishing a paper about a novel nosocomial infection. This book attributes the sensitivity of CPS social worker Jeanine Hilt to having to deal with fundamentalist parents while being gay. Yer (“yehr”) slamming a door is thought to have triggered the title (*) condition of this book, which is treated by the tall doctors Neil and Peggy. This book describes how qaug dab peg (kau da pay) is traditionally treated by a txiv neeb (tsi nehng), or shaman, and tells of a family who instead took their daughter to a Merced hospital. For 10 points, name this Anne Fadiman book about the failure of American hospitals to treat Lia Lee, an epileptic Hmong child.`,
  })

  return (
    <div className='editor-container'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <CategoryToolbar editor={editor} />
    </div>
  )
}
