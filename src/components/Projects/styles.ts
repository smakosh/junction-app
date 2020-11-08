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

    justify-content:center;
    p:first-child { 
        text-align:left;
        padding: 10px 0 0;
        font-weight: bold;
    }
    div{ 
        align-self:center;
    }
    
`