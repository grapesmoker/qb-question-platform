/* eslint-disable import/no-extraneous-dependencies */
import { getMarkRange, Mark, mergeAttributes } from '@tiptap/react';
import { Plugin, TextSelection } from 'prosemirror-state';

export const Comment = Mark.create({
  name: 'comment',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      comment: {
        default: null,
        parseHTML: (el) => (el).getAttribute('data-comment'),
        renderHTML: (attrs) => ({ 'data-comment': attrs.comment }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-comment]',
        getAttrs: (el) => !!(el).getAttribute('data-comment')?.trim() && null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setComment: (comment) => ({ commands }) => commands.setMark('comment', { comment }),
      toggleComment: () => ({ commands }) => commands.toggleMark('comment'),
      unsetComment: () => ({ commands }) => commands.unsetMark('comment'),
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleClick(view, pos) {
            const { schema, doc, tr } = view.state;

            const range = getMarkRange(doc.resolve(pos), schema.marks.comment);

            if (!range) return false;

            const [$start, $end] = [doc.resolve(range.from), doc.resolve(range.to)];

            view.dispatch(tr.setSelection(new TextSelection($start, $end)));

            return true;
          },
        },
      }),
    ];
  },
});