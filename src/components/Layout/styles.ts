import styled from "styled-components";
// import { shade } from 'polished';

export const Container = styled.div`
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100vh;
	align-items: space-between;

	div div {
		display: flex;
	}
`;

export const Loading = styled.div`
	max-width: 960px;
	width: 100%;
	margin: 0 auto;
`;
