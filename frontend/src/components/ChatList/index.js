import React, { useEffect, useState } from 'react';
import api from '../../api';

import { Container, Lista, Users, Avatar, AvatarHolder } from './styles';

export function ChatList({ setChat }) {

    const [ chats, setChats ] = useState([]);

    useEffect(() => {
        api.get(`/user/${localStorage.getItem('user')}/chats`).then(response => {
            if(response.status === 200){
                setChats(chats => {
                    return [...chats, ...response.data]
                });
            }
        })
    }, [])

    return(
        <Container>
            <Lista>
                {
                    chats.length > 0
                    ? chats.map(chat => (
                        <Users onClick={() => setChat(chat)}>
                            <AvatarHolder>
                                <Avatar src={chat.member.id == localStorage.getItem('user') ? chat.owner.avatar : chat.member.avatar}/>
                            </AvatarHolder>
                            <p>{chat.member.id == localStorage.getItem('user') ? chat.owner.name : chat.member.name}</p>
                        </Users>
                    )) : null
                }
            </Lista>
        </Container>
    );
}