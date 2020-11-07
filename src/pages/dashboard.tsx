import { NextPage, InferGetStaticPropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { CurriculumGetPayload, PrismaClient } from "@prisma/client";
import Head from "next/head";
import useFetchUser from "hooks/useFetchUser";
import Layout from "components/Layout";
import { CurriculumProps } from "interfaces";

const Dashboard: NextPage<CurriculumProps> = ({
	curriculums,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
	const { user, loading } = useFetchUser();

	return (
		<Layout user={user} loading={loading}>
			<Head>
				<title>Dashboard</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				style={{
					maxWidth: 960,
					margin: "0 auto",
				}}
			>
				{curriculums.length > 0 ? (
					curriculums.map(
						({
							id,
							title,
							content,
							teacher,
						}: CurriculumGetPayload<{ include: { teacher: true } }>) => (
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
						)
					)
				) : (
					<h2>No curriculums at the moment.</h2>
				)}
				<Link href="/">
					<a>View details</a>
				</Link>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
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

export default Dashboard;
