import { css } from 'emotion'

export const SongItemStyle = css`
  padding: 24px;
  box-sizing: border-box;
  margin-bottom: 16px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.03s ease-in-out;
  }
`
