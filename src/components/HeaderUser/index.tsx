import React from 'react';

import { Container } from './styles';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

const HeaderUser: React.FC = () => (
    <Container>
        <h1>Wellness Hub</h1>
        <p>
            <FiChevronLeft width={20}></FiChevronLeft>
            1.11. - 7.11.2020
            <FiChevronRight width={20}></FiChevronRight>
        </p>
    </Container>
)

export default HeaderUser;