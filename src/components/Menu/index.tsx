import Link from "next/link";
import React from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { motion } from "framer-motion";
import { UserState } from "interfaces";
import { Container, MenuFooter, Avatar, List } from "./styles";

const Menu = ({ user, title }: { user: UserState; title?: string }) => (
	<Container>
		<div>
			<Avatar src={user.avatar} alt="Avatar" width={150} height={150} />
			<p>{user.name}</p>
		</div>
		<ul>
			<List current={title === "Dashboard"}>
				<Link href="/dashboard">
					<motion.a
						animate={{ scale: 1 }}
						whileHover={{
							scale: 1.1,
						}}
						layoutId="Dashboard"
					>
						Dashboard
					</motion.a>
				</Link>
			</List>
			<List current={title === "Profile"}>
				<Link href={user.name ? "/my-profile" : "/profile"}>
					<motion.a
						animate={{ scale: 1 }}
						whileHover={{
							scale: 1.1,
						}}
						layoutId="Profile"
					>
						{user.name ? "Profile" : "Setup your profile"}
					</motion.a>
				</Link>
			</List>
			<List current={title === "Notifications"}>Notifications</List>
			<List current={title === "My calendar"}>My calendar</List>
			<List current={title === "Wellness Hub"}>
				<Link href="/wellnesshub">
					<motion.a
						animate={{ scale: 1 }}
						whileHover={{
							scale: 1.1,
						}}
						layoutId="Wellness Hub"
					>
						Wellness Hub
					</motion.a>
				</Link>
			</List>
		</ul>
		<MenuFooter>
			<a href="/api/auth/logout">
				<FiSettings width={30} />
				Settings
			</a>
			<a href="/api/auth/logout">
				<FiLogOut width={30} /> Log Out
			</a>
		</MenuFooter>
	</Container>
);

export default Menu;
