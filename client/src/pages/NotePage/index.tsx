import React, { useEffect, useRef, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../../utils/tools';

const DEFAULT_DATA: OutputData = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: '說點什麼吧！',
        level: 1,
      },
    },
  ],
};

const NotePage = () => {
  const editorInstance = useRef<EditorJS | null>(null);
  const [data, setData] = useState<OutputData>(DEFAULT_DATA);

  const onChange = async () => {
    const data = await editorInstance.current?.save();
    if (data) {
      setData(data);
    }
  };

  useEffect(() => {
    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: 'editor',
        tools: EDITOR_JS_TOOLS,
        data,
        onChange,
        onReady: () => {
          editorInstance.current = editor;
          console.log(editor);
        },
        placeholder: '說點什麼吧！',
      });
    }
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return <div id="editor" />;
};

export default NotePage;
