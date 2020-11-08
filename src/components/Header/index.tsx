import Link from "next/link";

const Header: React.FC<{
	user: { [key: string]: string } | null;
	loading: boolean;
}> = ({ user, loading }) => (
	<div
		style={{
			background: "#000",
			position: 'absolute',
			top: 0,
			width: '100%',
			color: "#fff",
			padding: "1.5rem 0",
		}}
	>
		<div
			style={{
				maxWidth: 960,
				margin: "0 auto",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Link href="/">
				<a>LearnHub</a>
			</Link>
			{!loading &&
				(user ? (
					<a href="/api/auth/logout">Logout</a>
				) : (
						<a href="/api/auth/login">Login</a>
					))}
		</div>
		<style jsx>{`
			a {
				color: #fff;
				text-decoration: none;
			}
		`}</style>
	</div>
);

export default Header;
