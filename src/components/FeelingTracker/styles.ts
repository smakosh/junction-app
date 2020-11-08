import styled from 'styled-components';
// import { shade } from 'polished';


export const Container = styled.div`
    background: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    margin-top: 25px;
    width: 100%;
    padding: 10px 25px 20px;

    p:first-child {
        padding: 10px 0;
        font-weight: bold;
        text-align:left;
    }
    p {
        text-align:center;
    }
    input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        padding: 0 10px;
    }

    input[type="range"]:focus {
        outline: none;
    }
    
    input[type="range"]::-webkit-slider-runnable-track {
        background: #E2EEFA;
        height: 5px;
    }
    input[type="range"]::-moz-range-track {
        background: #E2EEFA;
        height: 5px;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 15px;
        width: 15px;
        background: #337EC6;
        margin-top: -5px;
        border-radius: 50%;
    }

    input[type="range"]::-moz-range-thumb {
        height: 15px;
        width: 15px;
        background: #337EC6;
        margin-top: -5px;
        border-radius: 50%;
    }
    a { 
        background: #FFE166;
        max-width: 200px;
        align-self:center;
        border-radius:15px;
        padding: 12px 20px;
        margin: 10px 10px 20px;
        text-align:center;
    }
`
export const Buttons = styled.div`
    display: flex;
    justify-content:center;
    
    a:first-child { 
        border: none;
        border-bottom: 1px solid #1C1C1C;
        border-radius:1px;
        width: 98px;
        padding: 8px 0px;
    }
    a {
        
        width: 100px;
        padding: 5px 15px;
        border: 1px solid #1C1C1C;
        color: #1C1C1C;
        
        background: #fff;
    }
`;