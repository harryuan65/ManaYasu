import React, { useEffect, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../../utils/tools';
import APIManager from '../../api/APIManager';
import { useParams } from 'react-router-dom';

interface NoteShowResponse {
  _id: string;
  title: string;
  body: OutputData;
}

// Renders Note Editor after loaded from
const NotePage = () => {
  const { _id } = useParams();
  const [editor, setEditor] = useState<EditorJS | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<OutputData | null>(null);

  const resetEditor = () => {
    editor?.destroy();
    setEditor(null);
  };

  useEffect(() => {
    (async function () {
      setLoaded(false);
      resetEditor();
      console.log('Loading!!!');

      const response = await APIManager.Instance.get(`/notes/${_id}`);
      const responseData = response.data as NoteShowResponse;
      const editorContent = responseData.body;

      setData(editorContent);
      setLoaded(true);
    })();
  }, [_id]);

  const onChange = async () => {
    const data = await editor!.save();
    if (data) {
      try {
        await APIManager.Instance.patch(`/notes/${_id}`, {
          data,
        });
        setData(data);
        console.log('%c OK', 'color: green');
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (loaded && data && !editor) {
      const editor = new EditorJS({
        holder: 'editor',
        tools: EDITOR_JS_TOOLS,
        data,
        onChange,
        onReady: () => {
          setEditor(editor);
        },
        placeholder: '說點什麼吧！',
      });
    }
    return () => {
      if (editor) {
        editor.destroy();
        setEditor(null);
      }
    };
  }, [loaded]);

  return (
    <React.Fragment>
      <div id="editor" />
    </React.Fragment>
  );
};

export default NotePage;
