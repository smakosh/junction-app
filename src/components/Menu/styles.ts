import styled from "styled-components";

export const Container = styled.nav`
	background: #e5e5e5;
	padding: 10px 0;
	display: flex;
	flex-direction: column;
	width: 250px;
	margin: 20px 0;
	align-items: center;

	p {
		font-weight: bold;
	}

	ul {
		align-self: start;
		padding: 0;
		margin-bottom: 15rem;

		li,
		a {
			color: #005eb8;
			font-weight: bold;
			list-style-type: none;
		}
	}

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;

		div img {
			width: 100px;
			border-radius: 50%;
		}
	}

	a {
		width: 250px;
		cursor: pointer;
		display: block;
	}
`;

export const MenuFooter = styled.div`
	width: 230px;

	a {
		color: #000000;
		padding: 10px 40px;
		svg {
			margin-right: 10px;
		}
	}
`;

export const Avatar = styled.img`
	border-radius: 50%;
`;

export const List = styled.li<{ current: boolean }>`
	width: 200px;
	padding-left: 40px !important;
	padding: 15px 0;

	${({ current }) =>
		current &&
		`
			background: #fff;
			border-radius:  0 20px 20px 0;
	`}
`;
