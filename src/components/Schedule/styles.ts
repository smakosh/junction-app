import styled from 'styled-components';
// import { shade } from 'polished';


export const Container = styled.div`
    background: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    /* max-height: 180px; */
    margin: 25px 20px;
    width: 230px;
    height: 100%;
    padding: 10px 25px 20px;

    p { 
        padding: 10px 0;
        font-weight: bold;
    }

    aside { 
        display: flex;

        div p:first-child{ 
            margin-top: 25px;
        }
        div p{ 
            font-size: 12px;
            padding: 5px;
            font-weight: normal;
        }
        ul {
            margin-top: 10px;
            padding: 0;

            li:nth-child(1) {
                height: 80px;
                background: #00695C;
            }

            li:nth-child(2) {
                height: 120px;
                background: #33AB7E;
            }
            li:nth-child(3) {
                height: 50px;
                background: #00965E;
            }
            li:nth-child(4) {
                height: 80px;
                background: #33AB7E;
            }
            li:nth-child(5) {
                height: 140px;
                background: #F58689;
            }
            li {
            list-style:none;
            width: 10px;
            border-radius:15px;
            
            p {
                padding-left: 20px;
                font-size: 14px;
                font-weight: normal;
            }
        }
    }
    
`