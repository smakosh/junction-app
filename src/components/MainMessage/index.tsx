import { Container } from "./styles";

const MainMessage = ({ name }: { name?: string }) => (
	<Container>
		<div>
			<h1>Good morning, {name}!</h1>
			<p>
				You seem to have a busy day ahead of you. Try to take some time for
				healthy routines.
			</p>
		</div>
		<img src="/images/undraw_air_support_wy1q.svg" alt="image" />
	</Container>
);

export default MainMessage;
