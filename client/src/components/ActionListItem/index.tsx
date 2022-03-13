import styled from 'styled-components';
import Themes from '../../themes/default';

export default styled.li`
  color: ${Themes.text.unfocused};
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;
  margin: 10px 0;
  &:active {
    transition: color 0.2s ease;
    color: #888;
  }
`;
