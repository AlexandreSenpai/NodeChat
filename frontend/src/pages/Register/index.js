import React from 'react'
import { RightContainerRegister, InputsRegisterDiv } from './styles'
import { Background, Container, LeftContainer } from '../Login/styles';
import { Link, useNavigate } from 'react-router-dom'; 
import { Input } from '../../components/Form';
import api from '../../api';

function Register() {

  const navigate = useNavigate();

  const handle_register = async ({ name, email, password }) => {
    const response = await api.post('/register', { name, email })
    if(response.status === 200){
      if(response.data === null) return;
      localStorage.setItem('user', response.data.id);
      navigate(`/chat`);
    }
  }

  return(
    <Container>
      <LeftContainer>
        <Background></Background>
      </LeftContainer>
      <RightContainerRegister>

        <InputsRegisterDiv onSubmit={handle_register}>
          <div>
            <h1>Register</h1>
            <Input type="text" name="name" placeholder="Nome" />
            <Input type="text" name="email" placeholder="email" />
            <Input type="password" name="password" placeholder="Senha" />
            <button>Cadastrar</button>
            <p>Já possui cadastro? <Link to="/">Login</Link></p>
          </div>
        </InputsRegisterDiv>

      </RightContainerRegister>
    </Container>
  );
}

export default Register;
