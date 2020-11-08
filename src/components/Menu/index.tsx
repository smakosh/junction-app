import Link from "next/link";
import React from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { UserState } from "interfaces";
import { Container, MenuFooter, Avatar } from "./styles";

const Menu = ({ user }: { user: UserState }) => (
	<Container>
		<div>
			<Avatar src={user.avatar} alt="Avatar" width={150} height={150} />
			<p>{user.name}</p>
		</div>
		<ul>
			<li>Dashboard</li>
			<li>
				<Link href={user.name ? "/my-profile" : "/profile"}>
					<a>{user.name ? "Profile" : "Setup your profile"}</a>
				</Link>
			</li>
			<li>Notifications</li>
			<li>My calendar</li>
			<li>Wellness Hub</li>
		</ul>
		<MenuFooter>
			<a href="/api/auth/logout">
				<FiLogOut width={30}></FiLogOut>
				Settings
			</a>
			<a href="/api/auth/logout">
				<FiSettings width={30}></FiSettings> Log Out
			</a>
		</MenuFooter>
	</Container>
);

export default Menu;
