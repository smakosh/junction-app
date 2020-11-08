import auth0 from "utils/auth0";
import { useEffect, useState } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
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
import { motion } from "framer-motion";

const Dashboard = ({
	user: currentUser,
	avatar,
}: {
	user: UserState[];
	avatar: string;
}) => {
	const [loading, setloading] = useState(true);
	const { dispatch } = useUser();

	useEffect(() => {
		dispatch({
			type: "SAVE_USER",
			payload: { ...currentUser[0], avatar },
		});
		setloading(false);
	}, [currentUser]);

	return (
		<>
			{loading ? (
				<span>Loading...</span>
			) : currentUser[0] ? (
				<motion.div
					initial="initial"
					animate="enter"
					exit="exit"
					variants={{
						initial: { scale: 0.96, y: 30, opacity: 0 },
						enter: {
							scale: 1,
							y: 0,
							opacity: 1,
							transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
						},
						exit: {
							scale: 0.6,
							y: 100,
							opacity: 0,
							transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
						},
					}}
					style={{
						display: "flex",
						alignItems: "start",
					}}
				>
					<Head>
						<title>Welcome to StudenCuri</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Menu title="Dashboard" user={{ ...currentUser[0], avatar }} />
					<Flex>
						<Item col={12}>
							<MainMessage name={currentUser[0].name} />
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
				</motion.div>
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
				avatar: session.user.picture,
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
				avatar: session.user.picture,
			},
		};
	} catch (error) {
		userType = "none";
		console.log(error);
	}

	if (userType !== "teacher" || userType !== "teacher") {
		return {
			props: { user: session.user },
		};
	}
};

export default Dashboard;
