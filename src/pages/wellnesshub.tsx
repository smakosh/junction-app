import auth0 from "utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { Flex, Item } from "react-flex-ready";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import HeaderUser from "components/HeaderUser";
import DonutHealthy from "components/DonutHealthy";
import AddDonutHealthy from "components/DonutHealthy/addNew";
import LineChart from "components/LineChart";
import BlockMessage from "components/BlockMessage";
import Menu from "components/Menu";
import { UserState } from "interfaces";

const Wellnesshub = ({
	user,
	avatar,
}: {
	user: UserState[];
	avatar: string;
}) => {
	const router = useRouter();

	return (
		<>
			{!user[0] ? (
				<span>Loading...</span>
			) : user[0] ? (
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
					<Menu title="Wellness Hub" user={{ ...user[0], avatar }} />
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
									<DonutHealthy
										title="Drinking water"
										goal={100}
										measure="litters"
									/>
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
									<BlockMessage
										background={true}
										texts={[
											"Wellness tips of the week",
											"When looking at the results of your mood tracker, reflect back on the days when you were doing really well.",
											"What made you feel that way?",
											"Include those things in your routine more often.",
										]}
									/>
								</Item>
								<Item
									col={12}
									colTablet={12}
									colMobile={12}
									gap={2}
									style={{ alignSelf: "flex-start" }}
								>
									<BlockMessage
										background={false}
										texts={[
											"Connect your Oura ring for more detailed data",
											"The Oura ring or other fitness trackers can help you track your sleep and activity in more detail here.",
										]}
									/>
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
				router.push("/dashboard")
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

export default Wellnesshub;
