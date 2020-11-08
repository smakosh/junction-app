import Link from "next/link";
import React from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { UserState } from "interfaces";
import { Container, MenuFooter, Avatar } from "./styles";

const Menu = ({ state }: { state: UserState }) => (
	<Container>
		<div>
			<Avatar src={state.avatar} alt="Avatar" width={150} height={150} />
			<p>{state.name}</p>
			<Link href={state.name ? "/my-profile" : "/profile"}>
				<a>{state.name ? "View my profile" : "Setup your profile"}</a>
			</Link>
		</div>
		<ul>
			<li>Dashboard</li>
			<li>Profile</li>
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
