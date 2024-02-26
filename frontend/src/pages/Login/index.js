import React from 'react';
import { Input } from '../../components/Form';
import { Background, Container, LeftContainer, RightContainer, InputDiv } from './styles';
import { Link, useNavigate } from 'react-router-dom'; 
import api from '../../api';

function Login() {

    const navigate = useNavigate();

    const handle_login = async ({ email }) => { 
        const response = await api.get(`/user/login/${email}`);

        if(response.status === 200){
            if(response.data === null) return;
            localStorage.setItem('user', response.data.id);
            navigate('/chat');
        }
    }

    return(
        <Container>
            <LeftContainer>
                <Background/>
            </LeftContainer>
            <RightContainer>

                <InputDiv onSubmit={handle_login}>
                    <div>
                        <h1>Login</h1>
                        <Input type="text" name="email" placeholder="Email"/>
                        <Input type="password" name="password" placeholder="Senha" />
                        <br/>
                        <button>Entrar</button>
                        <p>Não possui cadastro? <Link to='/register'>Cadastrar</Link></p>
                    </div>
                </InputDiv>

            </RightContainer>
        </Container>
    );
}

export default Login;
