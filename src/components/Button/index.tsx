import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
