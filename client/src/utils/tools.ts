// tools.js
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Ruby from 'ruby-annotation';

export const EDITOR_JS_TOOLS = {
  warning: Warning,
  linkTool: LinkTool,
  code: Code,
  raw: Raw,
  quote: Quote,
  checkList: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: '標題',
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  list: {
    class: List,
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  Marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
  },
  embed: {
    class: Embed,
  },
  ruby: Ruby,
};
