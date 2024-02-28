import styled from 'styled-components';
import { Input, Form } from '../../components/Form';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
`;

export const MinimifiedOptions = styled.aside`
    width: 100%;
    max-width: 60px;
    height: 100%;
    background: ${props => props.theme.default.secondary};
`;

export const Users = styled.div`
    width: 100%;
    max-width: 15rem;
    height: 100%;
    background: ${props => props.theme.default.primary};
`;

export const Main = styled.main`
    width: 100%;
    height: 100%;
`;

export const MainHeader = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: column;
`;

export const SearchContainer = styled(Form)`
    width: 100%;
    height: 40%;
    background: ${props => props.theme.default.search.background};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 6px rgba(0, 0, 0, .1);
    position: relative;
    z-index: 3;
`;

export const SearchInput = styled(Input)`
    border: none;
    border-radius: 8px;
    background: ${props => props.theme.default.background};
    padding: 10px;
    width: 100%;
    max-width: 80rem;
`;

export const UserInformation = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    padding: 0px 16px;
    border-bottom: 1px solid #dedede;
`;

export const MainBody = styled.div`
    width: 100%;
    height: 93%;
    display: flex;
    flex-direction: column;
`;

export const MessagesHolder = styled.div`
    width: 100%;
    height: 90%;
    overflow: scroll;
    overflow-x: hidden;
    padding: 16px;

    &::-webkit-scrollbar {
        width: 13px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #444;
        border-radius: 16px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #333;
    }
`;

export const SenderContainer = styled(Form)`
    display: flex;
    width: 100%;
    height: 7%;
    align-items: center;
    justify-content: center;
`;

export const MessageInput = styled(Input)`
    width: 80%;
    background: #dedede;
    border: none;
    border-radius: 25px;
    padding: 16px;
    font-size: 16px;
`;


