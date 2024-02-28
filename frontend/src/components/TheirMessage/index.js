import React from 'react';

import { Container, Message, Avatar, AvatarHolder } from './styles';

function TheirMessage({ message, avatar }) {

    const has_attach = message?.attachment ? true : false;

    return(
        <Container>
            <AvatarHolder>
                <Avatar src={avatar} />
            </AvatarHolder>
            <Message>
                {has_attach && message?.attachment?.type === 'audio' && <audio controls><source src={message?.attachment?.uri} type={message?.attachment?.content_type} /></audio>}
                {message?.content !== "" && <div dangerouslySetInnerHTML={{__html: message?.content}} />}
            </Message>
        </Container>
    );
}

export default TheirMessage;