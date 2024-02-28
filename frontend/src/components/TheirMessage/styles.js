import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin: 10px 0px;
`;

export const Message = styled.div`
    background: #cccccc;
    border-radius: 25px;
    margin-right: 10px;
    padding: 10px 15px;
    max-width: 40%;
    word-wrap: break-all;
    color: black;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AvatarHolder = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid black;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
`;

export const Avatar = styled.img`
    width: 100%;
`;