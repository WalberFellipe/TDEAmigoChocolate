import React, { useState } from 'react';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import {login} from'../../services/auth'
export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        const data = {
            email, password
        };
    
        try {
            const response = await api.post('login', data);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userName',response.data.name)
            login(response.data.token);
            
            history.push('/home');

        } catch (err) {
            alert('Usuario ou senha incorreta tente novamente!');
        }
    }

    return (
        <div className="container">

            <div className="content">
                <h1>AMIGO CHOCOLATE <br /> Se delicie com seus amigos</h1>

                <form onSubmit={handleLogin}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail de cadastro:"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha:"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="btn" type="submit">Entrar</button>
                </form>
                <a href="/register">
                    <FiLogIn size={16} color="#fff" />
                    Caso não tenha cadastro clique aqui!!!
                    </a>
            </div>
        </div>
    )
}