import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useFetchUser from "hooks/useFetchUser";
import Layout from "components/Layout";
import Button from "components/Button";
import { Flex, Item } from "react-flex-ready";

const Curriculums = () => {
	const { user, loading } = useFetchUser();
	const router = useRouter();

	useEffect(() => {
		if (!loading && user) {
			router.push("/dashboard");
		}
	}, [loading, user]);

	return (
		<Layout user={user} loading={loading}>
			<Head>
				<title>Welcome to LearnHub</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				style={{
					maxWidth: 960,
					margin: "0 auto",
				}}
			>
				<>
					<h2>Welcome to LearnHub!</h2>
					<p>
						Just you know what feels like to be studying on 21st century. We get
						that! It's time to improve your well-being!
					</p>
				</>
				<Flex>
					<Item col={6} colTablet={6} colMobile={12} gap={1}>
						<Button href="/api/auth/login">Sign Up</Button>
					</Item>
					<Item col={6} colTablet={6} colMobile={12} gap={1}>
						<Button href="/api/auth/login">Sign In</Button>
					</Item>
				</Flex>
			</div>
		</Layout>
	);
};

export default Curriculums;
