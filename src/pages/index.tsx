import { GetStaticProps } from "next";
import { CurriculumGetPayload, PrismaClient } from "@prisma/client";
import Head from "next/head";
import useFetchUser from "hooks/useFetchUser";
import Layout from "components/Layout";

const Curriculums = ({
	curriculums,
}: {
	curriculums: CurriculumGetPayload<{ include: { teacher: true } }>[];
}) => {
	const { user, loading } = useFetchUser();

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
					<h2>No curriculums at the moment.</h2>
				)}
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
