import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket'; 
import MyMessage from '../../components/MyMessage';
import TheirMessage from '../../components/TheirMessage';
import Mic from '@material-ui/icons/Mic';
import Stop from '@material-ui/icons/MicOff';

import {
  Container, 
  Main,
  Users, 
  SearchContainer, 
  SearchInput, 
  MainHeader, 
  UserInformation, 
  MessagesHolder, 
  SenderContainer, 
  MessageInput, 
  MainBody 
} from './styles';

import { ChatList } from '../../components/ChatList';
import { User } from '../../components/User';
import api from '../../api';

import useRecorder from '../../hooks/useRecorder';
import axios from 'axios';
import notification from '../../static/audios/notification.wav';

function Chat() {
  
  const { audio, isRecording, startRecording, stopRecording } = useRecorder();
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const mySelf = activeChat?.member?.id == localStorage.getItem('user') ? activeChat?.owner : activeChat?.member;
  const [socketURL, setSocketURL] = useState(null);
  const [windowIsOpened, setWindowIsOpened] = useState(false);

  const { 
    sendJsonMessage,
    lastMessage,
    readyState
  } = useWebSocket(socketURL);

  const publishMessage = (content = "", attachment = null) => {
    const message_payload = {
      content: content,
      chat_id: activeChat?.id,
      sender_id: parseInt(localStorage.getItem('user')),
      recipient_id: activeChat?.member?.id == localStorage.getItem('user') ? activeChat?.owner?.id : activeChat?.member?.id,
      attachment: attachment
    }

    sendJsonMessage(message_payload)
    return message_payload;
  }

  useEffect(() => {
    window.addEventListener("focus", () => setWindowIsOpened(true));
    window.addEventListener("blur", () => setWindowIsOpened(false));

    return () => {
        window.removeEventListener("focus", setWindowIsOpened(false));
        window.removeEventListener("blur", setWindowIsOpened(false));
    };
  }, []);

  useEffect(() => {

    if(activeChat === null) return;

    setSocketURL(`ws://127.0.0.1:8000/chat/${activeChat.id}/user/${parseInt(localStorage.getItem('user'))}`);

    api.get(`/chat/${activeChat.id}`).then(newMessages => {
      if(newMessages.status === 200 && newMessages.data !== null){
        setMessages(newMessages.data.messages);
      }
    });

  }, [activeChat]);

  useEffect(() => {
    
    if(lastMessage === null) return;

    if(!windowIsOpened) {
      const audio = new Audio(notification);
      audio.play()
    }

    setMessages(lastMessages => {
      return [...lastMessages, JSON.parse(lastMessage.data)];
    });

  }, [lastMessage]);

  useEffect(() => {
    if(!audio) return;
    
    api.post('/attachments/create', { 'content_type': audio.mime }).then(res => {
      if(res.status === 200) {
        const url = res.data.url;
        const fileName = res.data.id;

        axios.put(url, audio.blob, { headers: { "Content-Type": audio.mime } }).then(res => {
          const message_payload = publishMessage("", {
            id: fileName,
            content_type: audio.mime,
            type: 'audio'
          });
  
          setMessages(lastMessages => {
            return [...lastMessages, {...message_payload, attachment: { ...message_payload.attachment, uri: audio.uri } }];
          });
        });
      }
    });
  
  }, [audio])

  const handleClickSendMessage = ({message}, { reset }) => {
    if(readyState === 1){

      const message_payload = publishMessage(message);

      setMessages(lastMessages => {
        return [...lastMessages, message_payload]
      })

      reset();
    }
  };

  const handle_search = ({ search }) => {
    console.log(search);
  }

  return(
      <Container>
          <Users>
            <ChatList setChat={setActiveChat} />
          </Users>
          <Main>
            <MainHeader>
              <SearchContainer onSubmit={handle_search}>
                <SearchInput name={"search"} placeholder="Pesquise por usuários..."/>
              </SearchContainer>
              <UserInformation>
                  <User user={mySelf} />
              </UserInformation>
            </MainHeader>
            <MainBody>
              <MessagesHolder>
                {
                  messages.length > 0
                  ? messages.map(message => { 
                      return parseInt(localStorage.getItem('user')) !== parseInt(message?.sender_id)
                              ? <TheirMessage key={message.id} message={message} avatar={mySelf.avatar} />  
                              : <MyMessage key={message.id} message={message}/>                 
                    })
                  : null
                }
              </MessagesHolder>
              <SenderContainer onSubmit={handleClickSendMessage}>
                <MessageInput name={"message"} placeholder="Enviar mensagem..."/>
                {!isRecording ? <Mic style={{ fontSize: 32 }} onClick={startRecording}/> : <Stop style={{ fontSize: 32 }} onClick={stopRecording} />}
              </SenderContainer>
            </MainBody>
          </Main>
      </Container>
  );
}

export default Chat;