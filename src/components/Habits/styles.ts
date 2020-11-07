import styled from 'styled-components';
// import { shade } from 'polished';

export const Container = styled.div`
    background: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    /* max-height: 180px; */
    margin-top: 25px;
    padding: 10px 25px 20px;

    p { 
        padding: 10px 0;
        font-weight: bold;
    }
    a {
        border-radius: 15px;
        padding: 5px 20px;
        background: #FFE166;
        color: #1C1C1C;
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-bottom: 20px;
        svg { 
            margin-right: 10px;
        }
    }
`