import React from 'react';

import { Container } from './styles';

const Schedule: React.FC = () => {
    const times = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
    return (
        <Container>
            <p>Today's schedule</p>
            <aside>
                <div>
                    {times.map((i) => (
                        <p>{i}</p>
                    ))}
                </div>
                <ul>
                    <li>
                        <div></div>
                        <p>Spanish Class</p>
                    </li>
                    <li>
                        <div></div>
                        <p>Lecture</p>
                    </li>
                    <li>
                        <div></div>
                        <p>Lunch</p>
                    </li>
                    <li>
                        <div></div>
                        <p>Lecture</p>
                    </li>
                    <li>
                        <div></div>
                        <p>Working on project 1</p>
                    </li>
                </ul>
            </aside>

        </Container>
    );
};
export default Schedule;