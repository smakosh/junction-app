import { useEffect } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import Error from "next/error";
import Head from "next/head";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import ProfileForm from "components/ProfileForm";
import Layout from "components/Layout";
import useFetchUser from "hooks/useFetchUser";
import auth0 from "utils/auth0";
import { useUser } from "providers/UserProvider";
import { UserState } from "interfaces";

const ProfilePage = ({ user: currentUser }: { user: UserState[] }) => {
	const { user, loading } = useFetchUser({ required: true });
	const { dispatch } = useUser();

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
				<title>Edit account</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{!loading &&
				(user ? (
					<div
						style={{
							maxWidth: 960,
							margin: "0 auto",
							padding: "5rem 0",
						}}
					>
						<ProfileForm user={user} />
						<Link href="/dashboard">
							<a>Back to Dashboard</a>
						</Link>
					</div>
				) : (
					<Error statusCode={404} />
				))}
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

	if (!session.user) {
		return {
			props: { user: {} },
		};
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
		return { props: { user: teacher } };
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
		return { props: { user: student } };
	} catch (error) {
		userType = "none";
		console.log(error);
	}

	if (userType !== "teacher" || userType !== "teacher") {
		return { props: { user: {} } };
	}
};

export default ProfilePage;
