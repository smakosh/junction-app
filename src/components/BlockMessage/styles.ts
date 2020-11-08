import styled from 'styled-components';
// import { shade } from 'polished';


export const Container = styled.div<{ background: boolean } >`

    p:first-child {
        font-weight: bold;
    }
    p { 
        max-width: ${({ background }) => background ? ' 360px;' : '400px'};
    }
    background: #fff;
    color: #000;
    display: flex;
    
    border-radius: 15px;
    justify-content: space-between;
    align-items:center;
    margin-top: 25px;
    padding: 18px 40px;

    background-image: ${({ background }) => background ? 'url("/images/undraw_new_ideas_jdea.svg")' : ''};
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center right;

    a { 
        display: flex;
        justify-content: center;
        align-items: center;

        background: #FFE166;
        border-radius: 15px;
        width: 80px;
        height: 40px;
    }
`