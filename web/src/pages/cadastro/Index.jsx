import React, { useState } from 'react';
import styles from './styles.module.css';
import imagem from '../../components/imagem.png';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/user-services';

export function Cadastro() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);

  async function onSubmit(data) {
    console.log(data);
    try {
      const user = await registerUser(data);
      setResult(user);
      console.log(result)
      if (user) {
        localStorage.setItem('Cpf', user.data.Cpf);
        sessionStorage.setItem('token', user.data.accessToken);
        navigate('/Home');
      } else {
        setResult('Erro de cadastro');
        alert(errors);
      }
    }
    catch (error) {
      setResult('Erro ao fazer cadastro');
      console.error('Erro ao fazer cadastro:', error);
    }
  }

  return (
    <div className={styles.tudo}>
      <div className={styles.esquerda}>
        <div className={styles.logo}>
          <img src={imagem} alt="Sem foto" width={70} />
          <div className={styles.nome}>
            <h1>Gestao</h1>
            <h2>de Sala</h2>
          </div>
        </div>
      </div>
      <div className={styles.direita}>
        <div className={styles.cadastro}>
          <h1>Cadastro</h1>
    
          <form onSubmit={handleSubmit(onSubmit)} className={styles.personalizada}>

            <input 
              className="mb-4"
              type="text" 
              name="Nome" 
              id="nome" 
              placeholder='Digite seu nome'
              {
                ...register('Nome')
            } />
            <input 
              type="email" 
              name="Email" 
              placeholder='Digite seu Email'
              id="nome" {
                ...register('Email')
            } />
            <input 
              type="text" 
              name="Cpf" 
              placeholder='Digite seu Cpf'
              id="nome" {
                ...register('Cpf')
            } />
            <input 
              type="text" 
              name="Cep" 
              placeholder='Digite seu Cep'
              id="nome" {
                ...register('Cep')
            } />
            <input 
              type="password" 
              name="Senha" 
              placeholder='Digite uma Senha'
              id="nome" {
                ...register('Senha')
            } />

            <div className={styles.Cadastrar}>
              <button type='submit' >Cadastrar</button>
            </div>
            {/* {result.length > 0 ? result : ''} */}
            <div className={styles.likedin}>
                <Link to="/" >Já tenho uma conta</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}
