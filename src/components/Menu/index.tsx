import Link from 'next/link';
import React from 'react';
import { Container, MenuFooter } from './styles';
import Image from 'next/image'

import { FiLogOut, FiSettings } from "react-icons/fi";

const Menu: React.FC = () => {
    return (
        <Container>

            <Image
                src="/images/avatar.png"
                alt="Avatar"
                width={150}
                height={150}
            />
            <p>Jane Jones</p>
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
};

export default Menu;

