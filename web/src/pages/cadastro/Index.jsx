import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import imagem from '../../components/imagem.png';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/user-services';
import cpf from 'cpf';

const API_URL = 'http://localhost:8080';


export function Cadastro() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);

  useEffect(() => {
    PesquisarCpf();
  }, []);
  
  async function PesquisarCpf(data) {
    try {
      const result = await fetch(`${API_URL}/findUser/${data.Cpf}`, { method: 'GET' });
      const ExisteData = await result.json();
  
      // Verifique se a API retornou algum dado válido que indica a existência do usuário
      if (ExisteData && ExisteData.Nome) {
        alert("Usuário já existe");
        return;
      } 
      return;
    } catch (error) {
      console.error(error);
    }
  }
  

  async function onSubmit(data) {

    //verifica se todos os campos estao preenchidos 
    if (!data.Nome|| !data.Email|| !data.Cpf|| !data.Cep|| !data.Senha){
      alert('É preciso preencher todos os campos! ');
      return;
    }
    PesquisarCpf(data);

    //verifica se o Cpf e valido
    if (!cpf.isValid(data.Cpf)) {
      alert("Cpf invalido");
      return;
    }

    //verifica se o Cep e valido
    if(!/[0-9]{5}[0-9]{3}$/.test(data.Cep)){
      alert("Cep Invalido");
      return;
    }

    //verifica se o Email é valido
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.Email)){
      alert("Email invalido");
      return;
    }

    try {
      const user = await registerUser(data);
      if (user) {
        console.log("entrou");
        localStorage.setItem('Cpf', user.data.Cpf);
        sessionStorage.setItem('token', user.data.accessToken);
        navigate('/Home');
      } else {
        setResult('Erro de cadastro');
      }
    }
    catch (error) {
      setResult(result);
      console.log(errors);
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
            <div className={styles.likedin}>
                <Link to="/" >Já tenho uma conta</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}
