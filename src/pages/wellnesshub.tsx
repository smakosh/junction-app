import auth0 from "utils/auth0";
import { useEffect } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import useFetchUser from "hooks/useFetchUser";
import HeaderUser from "components/HeaderUser";
import DonutHealthy from "components/DonutHealthy";
import AddDonutHealthy from "components/DonutHealthy/addNew";
import LineChart from "components/LineChart";
import BlockMessage from "components/BlockMessage";
import Menu from "components/Menu";
import React from "react";
import { Flex, Item } from "react-flex-ready";
import Error from "next/error";
import { useUser } from "providers/UserProvider";
import { UserState } from "interfaces";

const Wellnesshub = ({ user: currentUser }: { user: UserState[] }) => {
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
							<HeaderUser />
							Healthy habits
						</Item>

						<Item
							col={8}
							colTablet={6}
							colMobile={12}
							gap={2}
							style={{ alignSelf: "flex-start" }}
						>
							<Flex>
								<Item
									col={3}
									colTablet={12}
									colMobile={12}
									gap={2}
									style={{ alignSelf: "flex-start" }}
								>
									<DonutHealthy title="Walking" goal={80} measure="steps" />
								</Item>
								<Item
									col={3}
									colTablet={12}
									colMobile={12}
									gap={2}
									style={{ alignSelf: "flex-start" }}
								>
									<DonutHealthy title="Drinking water" goal={100} measure="litters" />
								</Item>
								<Item
									col={3}
									colTablet={12}
									colMobile={12}
									gap={2}
									style={{ alignSelf: "flex-start" }}
								>
									<DonutHealthy title="Meditation" goal={60} measure="hours" />
								</Item>
								<Item
									col={3}
									colTablet={12}
									colMobile={12}
									gap={2}
									style={{ alignSelf: "flex-start" }}
								>
									<AddDonutHealthy></AddDonutHealthy>
								</Item>
								<Item
									col={12}
									colTablet={12}
									colMobile={12}
									gap={2}
									style={{ alignSelf: "flex-start" }}
								>
									<BlockMessage background={true} texts={["Wellness tips of the week", "When looking at the results of your mood tracker, reflect back on the days when you were doing really well.", "What made you feel that way?", "Include those things in your routine more often."]} />

								</Item>
								<Item
									col={12}
									colTablet={12}
									colMobile={12}
									gap={2}
									style={{ alignSelf: "flex-start" }}
								>
									<BlockMessage background={false} texts={["Connect your Oura ring for more detailed data", "The Oura ring or other fitness trackers can help you track your sleep and activity in more detail here."]} />
								</Item>
							</Flex>
						</Item>
						<Item
							col={4}
							colTablet={6}
							colMobile={12}
							gap={2}
							style={{ alignSelf: "flex-start" }}
						>
							<LineChart />
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

export default Wellnesshub;
