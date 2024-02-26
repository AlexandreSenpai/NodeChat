import React from 'react';

import { Container, Message } from './styles';

function MyMessage({ message }) {

    const has_attach = message?.attachment ? true : false

    return(
        <Container>
            <Message>
                {has_attach && message?.attachment?.type === 'audio' && <audio controls><source src={message?.attachment?.uri} type={message?.attachment?.content_type} /></audio>}
                {message?.content !== "" && <div dangerouslySetInnerHTML={{__html: message?.content}} />}
            </Message>
        </Container>
    );
}

export default MyMessage;