import Header from "components/Header";

const Layout: React.FC<{
	user: { [key: string]: string } | null;
	loading: boolean;
}> = ({ user, loading, children }) => (
	<>
		<Header user={user} loading={loading} />
		{loading ? <span>Loading...</span> : children}
		<style jsx global>{`
			body {
				padding: 0;
				margin: 0;
			}
		`}</style>
	</>
);

export default Layout;
