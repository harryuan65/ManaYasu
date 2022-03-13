import React from 'react';
import ActionList from '../ActionList';
import ActionListItem from '../ActionListItem';
import Notes from '../Notes';

const NoteSideBar = () => {
  return (
    <ActionList>
      <ActionListItem>建立筆記 + </ActionListItem>
      <Notes />
    </ActionList>
  );
};

export default NoteSideBar;
