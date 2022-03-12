import React, { useEffect, useRef, useState } from 'react';
import EditorJS, { API, OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../../utils/tools';

const DEFAULT_DATA: OutputData = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'This is my awesome editor!',
        level: 1,
      },
    },
  ],
};

const NotesPage = () => {
  const editorInstance = useRef<EditorJS | null>(null);
  const [data, setData] = useState<OutputData>(DEFAULT_DATA);

  const onChange = async (api: API, event: CustomEvent<any>) => {
    console.log(api);
    console.log(event);
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

  return (
    <div>
      <div id="editor"></div>
    </div>
  );
};

export default NotesPage;
