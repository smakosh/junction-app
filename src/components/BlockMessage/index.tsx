import React from 'react';

import { Container } from './styles';
import { FiPlus } from "react-icons/fi";

interface BlockTexts {
    texts: string[];
    background: boolean;
}
const BlockMessage: React.FC<BlockTexts> = ({ texts, background }) => (
    <Container background={background}>
        <div>
            {texts.map(text => <p>{text}</p>)}
        </div>
        { !background &&
            <a href="">
                <FiPlus></FiPlus>
            </a>
        }

    </Container>
)

export default BlockMessage;