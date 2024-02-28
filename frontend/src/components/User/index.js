import React from 'react';

import { Container, Avatar, AvatarHolder } from './styles';

export function User({ user }) {

    return(
        <Container>
            <AvatarHolder>
                <Avatar src={user?.avatar}/>
            </AvatarHolder>
            <p>{user?.name}</p>
        </Container>
    );
}