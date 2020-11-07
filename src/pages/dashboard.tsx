import auth0 from "utils/auth0";
import { useEffect } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { CurriculumGetPayload, PrismaClient } from "@prisma/client";
import Head from "next/head";
import useFetchUser from "hooks/useFetchUser";
import Layout from "components/Layout";
import Error from "next/error";
import { useUser } from "providers/UserProvider";
import { UserState } from "interfaces";

const Dashboard = ({
	user: currentUser,
	curriculums,
}: {
	curriculums: CurriculumGetPayload<{ include: { teacher: true } }>[];
	user: UserState[];
}) => {
	const { user, loading } = useFetchUser({ required: true });
	const { state, dispatch } = useUser();

	useEffect(() => {
		dispatch({
			type: "SAVE_USER",
			payload: {
				...currentUser[0],
				avatar: !loading && user?.picture ? user?.picture : "",
			},
		});
	}, [currentUser]);

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
					padding: "2rem 0",
				}}
			>
				{!loading && (
					<>
						{!loading && (
							<Link href={state.name ? "/my-profile" : "/profile"}>
								<a>{state.name ? "View my profile" : "Setup your profile"}</a>
							</Link>
						)}
						{user ? (
							<>
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
							</>
						) : (
							<Error statusCode={404} />
						)}
					</>
				)}
			</div>
		</Layout>
	);
};

export const getServerSideProps = async ({
	req,
	res,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
}) => {
	const session = await auth0.getSession(req);

	if (!session || !session.user) {
		res.writeHead(302, {
			Location: "/api/login",
		});
		res.end();
		return;
	}

	const prisma = new PrismaClient();
	let userType;

	const curriculums = await prisma.curriculum.findMany({
		where: {
			published: true,
		},
		include: {
			teacher: true,
		},
	});

	if (!session.user) {
		return {
			props: { user: {}, curriculums: JSON.parse(JSON.stringify(curriculums)) },
		};
	}

	// I know this isn't how it should be done, but for the sake of speed and delivery.

	try {
		const teacher = await prisma.teacher.findMany({
			where: {
				email: session.user.email,
				userId: session.user.id,
			},
		});
		userType = "teacher";
		return {
			props: {
				user: teacher,
				curriculums: JSON.parse(JSON.stringify(curriculums)),
			},
		};
	} catch (error) {
		console.log(error);
		userType = "student";
	}

	try {
		const student = await prisma.teacher.findMany({
			where: {
				email: session.user.email,
				userId: session.user.id,
			},
		});
		userType = "student";
		return {
			props: {
				user: student,
				curriculums: JSON.parse(JSON.stringify(curriculums)),
			},
		};
	} catch (error) {
		userType = "none";
		console.log(error);
	}

	if (userType !== "teacher" || userType !== "teacher") {
		return {
			props: { user: {}, curriculums: JSON.parse(JSON.stringify(curriculums)) },
		};
	}
};

export default Dashboard;
