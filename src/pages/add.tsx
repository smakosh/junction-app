import Error from "next/error";
import Head from "next/head";
import Link from "next/link";
import PostForm from "components/PostForm";
import Layout from "components/Layout";
import useFetchUser from "hooks/useFetchUser";

const Add = () => {
	const { user, loading } = useFetchUser({ required: true });

	return (
		<Layout user={user} loading={loading}>
			<Head>
				<title>Add new curriculum</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{!loading &&
				(user ? (
					<div
						style={{
							maxWidth: 960,
							margin: "0 auto",
							padding: "5rem 0",
						}}
					>
						<PostForm />
						<Link href="/profile">
							<a>Go to Profile page</a>
						</Link>
					</div>
				) : (
					<Error statusCode={404} />
				))}
		</Layout>
	);
};

export default Add;
