import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Themes from '../../themes/default';
import { FakeAPI } from '../../utils/api_mock';

interface NoteInfo {
  id: number;
  title: string;
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
`;

const NoteItem = styled.li`
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
  // const getNotes = async () => {
  //   return new Promise<NoteInfo[]>((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(
  //         Array(5)
  //           .fill(null)
  //           .map((_, i) => {
  //             return {
  //               id: i + 1,
  //               title: `我的筆記:日本常見的三餐三餐三餐有哪些${i}`,
  //             };
  //           })
  //       );
  //     }, 1000);
  //   });
  // };

  useEffect(() => {
    (async () => {
      const data = await FakeAPI<NoteInfo[]>(
        Array(5)
          .fill(null)
          .map((_, i) => {
            return {
              id: i + 1,
              title: `我的筆記:日本常見的三餐三餐三餐有哪些${i}`,
            };
          }),
        3000
      );
      setNotes(data);
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
      <NoteItem key={nanoid()} $active={isActiveNote(String(note.id))}>
        <NoteTag>綜合</NoteTag>
        <NoteText>{note.title}</NoteText>
      </NoteItem>
    ));
  }
  return <NotesList>{renderContent}</NotesList>;
};

export default Notes;
