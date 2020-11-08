import auth0 from "utils/auth0";
import { useEffect } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import useFetchUser from "hooks/useFetchUser";
import MainMessage from "components/MainMessage";
import Habits from "components/Habits";
import FeelingTracker from "components/FeelingTracker";
import Projects from "components/Projects";
import Schedule from "components/Schedule";
import Menu from "components/Menu";
import React from "react";
import { Flex, Item } from "react-flex-ready";
import Error from "next/error";
import { useUser } from "providers/UserProvider";
import { UserState } from "interfaces";

const Dashboard = ({ user: currentUser }: { user: UserState[] }) => {
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
		<>
			{loading && !state.avatar ? (
				<span>Loading...</span>
			) : user ? (
				<div
					style={{
						display: "flex",
						alignItems: "start",
					}}
				>
					<Head>
						<title>Welcome to StudenCuri</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Menu state={state} />
					<Flex>
						<Item col={12}>
							<MainMessage />
						</Item>
						<Item
							col={6}
							colTablet={6}
							colMobile={12}
							gap={2}
							style={{ alignSelf: "flex-start" }}
						>
							<Habits />
							<Projects />
						</Item>
						<Item
							col={6}
							colTablet={6}
							colMobile={12}
							style={{ alignSelf: "flex-start" }}
						>
							<FeelingTracker />
						</Item>
					</Flex>

					<Flex>
						<Item col={12} colTablet={6} colMobile={12} gap={1}>
							<Schedule />
						</Item>
					</Flex>
				</div>
			) : (
				<Error statusCode={404} />
			)}
		</>
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

	if (!session.user) {
		return {
			props: { user: {} },
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
			},
		};
	} catch (error) {
		userType = "none";
		console.log(error);
	}

	if (userType !== "teacher" || userType !== "teacher") {
		return {
			props: { user: {} },
		};
	}
};

export default Dashboard;
