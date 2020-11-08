import React from 'react';

import { Container } from './styles';
import { FiCircle, FiCheckCircle } from "react-icons/fi";


const Habits: React.FC = () => (
    <Container>
        <p>Here are your healthy habits for today</p>
        <a href="/dashboard">
            <FiCircle width={30}></FiCircle>
            <p>Walk form spanish class to lecture (5min.)</p>
        </a>
        <a href="/dashboard">
            <FiCheckCircle width={30}></FiCheckCircle>
            <p>Have a glass of water (1-2min.)</p>
        </a>
    </Container>
)

export default Habits;