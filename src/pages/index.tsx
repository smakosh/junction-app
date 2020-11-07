import { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { CurriculumGetPayload, PrismaClient } from "@prisma/client";
import Head from "next/head";
import useFetchUser from "hooks/useFetchUser";
import Layout from "components/Layout";
import { CurriculumProps } from "interfaces";

// Welcome
const Curriculums: NextPage<CurriculumProps> = ({
	curriculums,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { user, loading } = useFetchUser({ required: true });

	return (
		<Layout user={user} loading={loading}>
			<Head>
				<title>Welcome to StudenCuri</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				style={{
					maxWidth: 960,
					margin: "0 auto",
				}}
			>
				<h2> Welcome to StudenCuri. Sign up now!</h2>
				<a href="/api/auth/login">Sign up</a>
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
