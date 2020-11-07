import { NextPage, InferGetStaticPropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { CurriculumGetPayload, PrismaClient } from "@prisma/client";
import Head from "next/head";
import useFetchUser from "hooks/useFetchUser";
import Board from "components/Board";
import MainMessage from "components/MainMessage";
import Habits from "components/Habits";
import FeelingTracker from "components/FeelingTracker";
import Projects from "components/Projects";
import Schedule from "components/Schedule";
import Menu from "components/Menu";
import { CurriculumProps } from "interfaces";
import React from "react";
import { Flex, Item } from 'react-flex-ready'

const Dashboard: NextPage<CurriculumProps> = ({
	curriculums,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
	const { user, loading } = useFetchUser();

	return (
		<Board user={user} loading={loading}>
			<Menu />

			<Flex>
				<Item col={12} >
					<MainMessage />
				</Item>
				<Item col={6} colTablet={6} colMobile={12} gap={2} style={{ alignSelf: 'flex-start' }}>
					<Habits />
					<Projects />
				</Item>
				<Item col={6} colTablet={6} colMobile={12} style={{ alignSelf: 'flex-start' }}>
					<FeelingTracker />
				</Item>
			</Flex>

			<Flex>
				<Item col={12} colTablet={6} colMobile={12} gap={1}>
					<Schedule />
				</Item>
			</Flex>

		</Board >
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
