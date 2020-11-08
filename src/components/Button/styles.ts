import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.a`
  background: #FFE166;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align:center;

  &:hover {
    background: ${shade(0.2, '#FFE166')};
  }
`;
