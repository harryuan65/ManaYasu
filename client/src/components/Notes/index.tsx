import { OutputData } from '@editorjs/editorjs';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import APIManager from '../../api/APIManager';
import Themes from '../../themes/default';

interface NoteInfo {
  _id: number;
  title: string;
  data: OutputData;
}

const NotesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NoteTag = styled.span`
  background-color: #2e4053;
  color: ${Themes.text.white};
  border-radius: 5px;
  padding: 3px 7px;
  font-size: 16px;
  margin-left: 6px;
  white-space: nowrap;
`;

const NoteItem = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-left-width: 10px;
  border-left-style: solid;
  border-left-color: ${(props: { $active?: boolean }) =>
    props.$active ? Themes.accent : 'transparent'};
  padding: 10px 5px;
  background-color: ${(props: { $active?: boolean }) =>
    props.$active ? Themes.background.activeListItem : ''};

  transition: background-color 0.1s ease-in;

  &:hover {
    transition: background-color 0.1s ease-in;
    background-color: ${Themes.background.hoverListItem};
  }

  &:active {
    transition: background-color 0.1s ease-in;
    background-color: ${Themes.background.activeListItem};
  }

  &:link,
  &:visited {
    text-decoration: none;
  }
`;

const NoteText = styled.span`
  margin: 0 0 0 8px;
  color: ${Themes.text.black};
  font-size: 18px;
  display: inline-block;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Notes = () => {
  const [notes, setNotes] = useState<NoteInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    (async function () {
      const response = await APIManager.Instance.get('/notes');
      const data = response.data;
      console.log(response.data);

      const notesData = data.notes as NoteInfo[];
      setNotes(notesData);
      setLoading(false);
    })();
  }, []);

  const isActiveNote = (id: string) => {
    const md = pathname.match(/\/notes\/(.+)/);
    if (!md) return false;

    return md[1] === id;
  };

  let renderContent = [<p key={nanoid()}>Loading</p>];
  if (!loading) {
    renderContent = notes.map((note) => (
      <NoteItem
        to={`/notes/${note._id}`}
        key={nanoid()}
        $active={isActiveNote(String(note._id))}
      >
        <NoteTag>綜合</NoteTag>
        <NoteText>{note.title}</NoteText>
      </NoteItem>
    ));
  }
  return <NotesList>{renderContent}</NotesList>;
};

export default Notes;
