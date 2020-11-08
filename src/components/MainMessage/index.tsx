import { Container } from "./styles";

const MainMessage = ({ name }: { name: string }) => (
	<Container>
		<h1>Good morning, {name}!</h1>
		<p>
			You seem to have a busy day ahead of you. Try to take some time for
			healthy routines.
		</p>
	</Container>
);

export default MainMessage;
