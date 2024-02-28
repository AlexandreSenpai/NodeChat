import styled from 'styled-components';
import background from '../../static/images/background-login.png'
import { Form } from '../../components/Form';


export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: ${props => props.theme.default.background};

    display: flex;
    justify-content: center;
`;

export const RightContainer = styled.div`
    width: 50%;
    height: 100%;
    background: ${props => props.theme.default.background};
`;

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(${background});
  background-size: cover;
`;

export const LeftContainer = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: ${props => props.theme.default.primary};
`;

export const InputDiv = styled(Form)`
    top: 50%;
    width: 100%;
    height: 100%;
    text-align: left;
    margin-top: 30%;
    display: flex;
    justify-content: center;

    div {
        padding: 16px;
    }

    h1{
        font-size: 3rem;
        font-weight: 300;
    }

    input{
        font-size: 1.3rem;
        width: 100%;
        margin-top: 10px;
        padding: 24px;
        border-radius: 30px;
        background: #dedede;
        border: none;
        outline: none;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 300;
    }

    button{
        font-size: 1.5rem;
        width: 100%;
        margin-top: 10px;
        color: #ffffff;
        border: none;
        border-radius: 30px;
        padding: 20px;
        background: ${props => props.theme.default.secondary}
    }

    p{
        margin-top: 4px;
        font-size: 15px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        text-align: right;
    }


`;
