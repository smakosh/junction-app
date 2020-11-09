import Header from "components/Header";
import { Container, Loading } from "./styles";

const Layout: React.FC<{
	user: { [key: string]: string } | null;
	loading: boolean;
}> = ({ user, loading, children }) => (
	<Container>
		<Header user={user} loading={loading} />
		{loading ? (
			<Loading>
				<span>Loading...</span>
			</Loading>
		) : (
			children
		)}
	</Container>
);

export default Layout;
