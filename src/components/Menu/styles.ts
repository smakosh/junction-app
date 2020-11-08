import styled from 'styled-components';


export const Container = styled.nav`
    background: #E5E5E5;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    width: 250px;
    margin: 20px 0;
    align-items:center;

    p {
        font-weight: bold;
    }

    ul { 
        align-self: start;
        padding: 0;
        margin-bottom: 15rem;
    
        li:first-child {
            background: #fff;
            border-radius:  0 20px 20px 0;
        }
        li {
            width: 200px;
            padding-left: 40px !important;
            padding: 15px 0;
        }

        li, a {
            color: #005EB8;
            font-weight: bold;
            list-style-type: none;
        }
    }

    div { 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        div img {
            width: 100px;
            border-radius: 50%;
        }
    }
    
    a { 
        width: 250px;
    }
`

export const MenuFooter = styled.div`
    width: 230px;

    a {
        color: #000000;
        padding: 10px 40px;
        svg {
            margin-right: 10px;
        }
    }
`;

export const Avatar = styled.img`
    border-radius: 50%;
`