import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import './style.css'


export default function Profile() {
    const [name, getName] = useState('');
    const [email, getEmail] = useState('');
    const [birthday, getBirthday] = useState('');

    const UserId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('users', {
            headers: {
                id: UserId
            }
        }).then(response => {
            getName(response.data.name);
            getEmail(response.data.email);
            getBirthday(response.data.birthday);

        })

    }, [])

    return (
        <div className="container">
            <div className="content">
                <Link to="/home"><FiArrowLeft size="16" /> Voltar</Link>
                <h1>Perfil do usuario</h1>
                <form>
                    <strong>Nome:</strong>
                    <label>{name}</label>
                    <strong>E-mail:</strong>
                    <label>{email}</label>
                    <strong>Data de Nascimento:</strong>
                    <label>{moment(birthday).format("DD/MM/YYYY")}</label>
                </form>
            </div>
        </div>
    )
}