import React from 'react';

import { Container } from './styles';
import Image from 'next/image'


const Projects: React.FC = () => (
    <Container>
        <p>Your current projects</p>
        <p>There is nothing here yet. You can add projects when your teachers assign you some project work.</p>
        <Image
            src="/images/undraw_No_data_re_kwbl.svg"
            alt="Projects"
            width={150}
            height={150}
        />
    </Container>
)

export default Projects;