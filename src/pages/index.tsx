import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { CurriculumGetPayload, PrismaClient } from "@prisma/client";
import Head from "next/head";
import useFetchUser from "hooks/useFetchUser";
import Layout from "components/Layout";
import Button from "components/Button";
import { Flex, Item } from "react-flex-ready";

const Curriculums = ({
	curriculums,
}: {
	curriculums: CurriculumGetPayload<{ include: { teacher: true } }>[];
}) => {
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
				{curriculums.length > 0 ? (
					curriculums.map(({ id, title, content, teacher }) => (
						<ul key={id}>
							<li>
								<h1>{title}</h1>
								<span
									key={id}
									style={{
										background: "cyan",
										padding: ".2rem .5rem",
										display: "inline-block",
										marginBottom: 20,
										marginRight: 20,
									}}
								>
									{teacher?.name}
								</span>
							</li>
							{content && (
								<li>
									<div dangerouslySetInnerHTML={{ __html: content }} />
								</li>
							)}
						</ul>
					))
				) : (
						<>
							<h2>Welcome to LearnHub!</h2>
							<p>Just you know what feels like to be studying on 21st century. We get that! It's time to improve your well-being!</p>
						</>
					)}
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

export const getStaticProps: GetStaticProps = async () => {
	const prisma = new PrismaClient();

	const curriculums = await prisma.curriculum.findMany({
		where: {
			published: true,
		},
		include: {
			teacher: true,
		},
	});

	return {
		props: { curriculums: JSON.parse(JSON.stringify(curriculums)) },
	};
};

export default Curriculums;
