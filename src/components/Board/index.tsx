import React from 'react';

import { Container } from './styles';

const Board: React.FC<{ user: { [key: string]: string } | null; loading: boolean; }> =
  ({ user, loading, children }) => (
    <Container>
      {loading ? <span>Loading...</span> : children}
    </Container>
  );

export default Board;