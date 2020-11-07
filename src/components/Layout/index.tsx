import Header from "components/Header";
import { Container } from "./styles";

const Layout: React.FC<{
	user: { [key: string]: string } | null;
	loading: boolean;
}> = ({ user, loading, children }) => (
	<Container>
		<Header user={user} loading={loading} />
		{loading ? <span>Loading...</span> : children}
	</Container>
);

export default Layout;
