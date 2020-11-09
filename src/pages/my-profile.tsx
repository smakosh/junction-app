import auth0 from "utils/auth0";
import { Flex, Item } from "react-flex-ready";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import MainMessage from "components/MainMessage";
import Habits from "components/Habits";
import FeelingTracker from "components/FeelingTracker";
import Projects from "components/Projects";
import Menu from "components/Menu";
import { UserState } from "interfaces";

const MyProfile = ({ user, avatar }: { user: UserState[]; avatar: string }) => {
	const router = useRouter();

	if (typeof window === "undefined") {
		return <h4>Loading...</h4>;
	}

	return user[0] ? (
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
			<Menu title="Profile" user={{ ...user[0], avatar }} />
			<Flex>
				<Item col={12}>
					<MainMessage name={user[0].name} />
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
		</div>
	) : (
		router.push("/profile")
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

export default MyProfile;
