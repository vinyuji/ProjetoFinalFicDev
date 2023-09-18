import React from 'react';
import styles from './styles.module.css';
import imagem from '../../utils/Esquerda/imagem.png';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
const API_URL = 'http://localhost:8080';

export function Cadastro() {
  const [users, setUsers] = useState([]);
  const [novoUser, setNovoUser] = useState({
    Nome: '',
    Email: '',
    Cpf: '',
    Cep: '',
    Senha: '',
    ConfiSenha: '',
  });

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const result = await fetch(`${API_URL}/findUser`, { method: 'GET' });
      const userData = await result.json();
      setUsers(userData);
    } catch (error) {
      console.error(error);
    }
  }

  async function createUser() {
    try {
      if (!novoUser.Nome || !novoUser.Email || !novoUser.Cpf || !novoUser.Cep || !novoUser.Senha || !novoUser.ConfiSenha) {
        alert('Preencha todos os campos');
        return;
      }
      if (novoUser.Senha !== novoUser.ConfiSenha) {
        alert('Confirmação de senha incorreta');
        return;
      }
      console.log("senha foi");
      
      const result = await fetch(`${API_URL}/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUser),
      });
      console.log("Criar foi");

      const novoUserData = await result.json();
      if (result.status === 201) {
        alert('Usuário criado com sucesso!');
        setNovoUser({ Nome: '', Email: '', Cpf: '', Cep: '', Senha: '', ConfiSenha: '' });
        setUsers([...users, novoUserData]);
      } else {
        alert(novoUserData.error);
      }
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.tudo}>
      <div className={styles.esquerda}>
        <div className={styles.logo}>
          <img src={imagem} alt="Sem foto" width={ 60 } />
          <div className={styles.nome}>
            <h1>Gestao</h1>
            <h2>de Sala</h2>
          </div>
        </div>
      </div>
      <div className={styles.direita}>
        <div className={styles.login}>
          <h1>Cadastro</h1>
          <form>
          <div class="form-group">
            <input 
              className={ styles.personalizada }
              type="text" 
              placeholder="Digite o Nome"
              value={novoUser.Nome}
              onChange={(e) => setNovoUser({ ...novoUser, Nome: e.target.value })}
            />
            </div>
            <div class="form-group">
            <input 
              className={ styles.personalizada }
              type="email" 
              placeholder="Digite o E-mail"
              value={novoUser.Email}
              onChange={(e) => setNovoUser({ ...novoUser, Email: e.target.value })}
            />
            </div>
            <div class="form-group">
            <input 
              className={ styles.personalizada }
              type="text" 
              placeholder="Digite o Cpf"
              value={novoUser.Cpf}
              onChange={(e) => setNovoUser({ ...novoUser, Cpf: e.target.value })}
            />
            </div>
            <div class="form-group">
            <input 
              className={ styles.personalizada }
              type="text" 
              placeholder="Digite o Cep"
              value={novoUser.Cep}
              onChange={(e) => setNovoUser({ ...novoUser, Cep: e.target.value })}
            />
            </div>
            <div class="form-group">
            <input 
              className={ styles.personalizada }
              type="password" 
              placeholder="Digite a Senha"
              value={novoUser.Senha}
              onChange={(e) => setNovoUser({ ...novoUser, Senha: e.target.value })}/>
            </div>
            <div class="form-group">
            <input 
              className={ styles.personalizada }
              type="password" 
              placeholder="Confirmar Senha"
              value={novoUser.ConfiSenha}
              onChange={(e) => setNovoUser({ ...novoUser, ConfiSenha: e.target.value })}/>
            </div>
            
              <button type="submit" onClick={createUser}   class={styles.Entrar}>Cadastrar</button>
      
            <div className={styles.cadastro}>
              <button>
                <Link to = "/"> já  possui  Login?  Clique  aqui</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}






