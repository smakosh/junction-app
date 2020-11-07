import React from 'react';

import { Container, Buttons } from './styles';

const FeelingTracker: React.FC = () => (
    <Container>
        <p>How are you feeling today?</p>
        <p>Keep a record on how you are doing to better track the affect of your new habits.</p>

        <div>
            <p>fatigued/energetic</p>
            <input type="range" min="1" max="100" value="50" />
        </div>
        <div>
            <p>anxious/confident</p>
            <input type="range" min="1" max="100" value="50" />
        </div>
        <div>
            <p>unhappy /happy</p>
            <input type="range" min="1" max="100" value="50" />
        </div>
        <p>You can anonymously share these results with your teachers. This will help the teachers to support you students.</p>
        <Buttons>
            <a href="">learn more</a>
            <a href="">share</a>
        </Buttons>
        <a href="">Save my answers</a>
    </Container>
)

export default FeelingTracker;