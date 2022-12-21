import React, { useCallback, useEffect, useState } from 'react';
import EditorJS, { API, OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../../utils/tools';
import APIManager from '../../api/APIManager';
import { useParams } from 'react-router-dom';

interface NoteShowResponse {
  _id: string;
  title: string;
  body: OutputData;
}

const createEditor = (
  data: OutputData,
  onChange: (api: API, event: CustomEvent<any>) => void
) => {
  return new EditorJS({
    holder: 'editor',
    tools: EDITOR_JS_TOOLS,
    data,
    onChange,
    placeholder: '說點什麼吧！',
  });
};

// Renders Note Editor after dataFetched from
const NotePage = () => {
  const { _id } = useParams();
  const [editor, setEditor] = useState<EditorJS | null>(null);

  const clearEditor = () => {
    if (editor) {
      editor!.destroy();
      setEditor(null);
    }
  };

  const fetchNoteData = async (): Promise<OutputData> => {
    const response = await APIManager.Instance.get(`/notes/${_id}`);
    const responseData = response.data as NoteShowResponse;
    return responseData.body;
  };

  const onChange = useCallback(async () => {
    const data = await editor!.save();
    if (data) {
      try {
        await APIManager.Instance.patch(`/notes/${_id}`, {
          data,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [editor]);

  const initializeNoteEditor = async () => {
    clearEditor();
    const newEditor = createEditor(await fetchNoteData(), onChange);
    setEditor(newEditor);
  };

  useEffect(() => {
    initializeNoteEditor();
  }, [_id]);

  return (
    <React.Fragment>
      <div id="editor" />
    </React.Fragment>
  );
};

export default NotePage;
