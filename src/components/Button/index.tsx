import React, { AnchorHTMLAttributes } from "react";

import { Container } from "./styles";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
	<Container {...rest}>{children}</Container>
);

export default Button;
