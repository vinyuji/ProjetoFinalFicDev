import React from 'react';
import styles from './styles.module.css';
import imagem from './imagem.png'; 
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className={styles.tudo}>
      <div className={styles.esquerda}>
        <div className={styles.login}>
          <h1>LOGIN</h1>
          <form>
            <div class="form-group">
              <input type="email" className={styles.personalizada} aria-describedby="emailHelp" placeholder="Digite o E-mail"/>
            </div>
            <div class="form-group">
            <input type="password" className={styles.personalizada} placeholder="Digite a Senha"/>
            </div>
            <div class={styles.box}>
              <input type="checkbox" classname={styles.checkbox}id="exampleCheck1"/>
              <label classname={styles.check} for="exampleCheck1">Manter conectado ao sistema</label>
            </div>
            <Link to="/Home">
              <button type="submit" class={styles.Entrar}>Entrar</button>
            </Link>
            <div className={styles.cadastro}>
              <button>
                <Link to="/Cadastro">Não  possui  cadastro?  Clique  aqui</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.direita}>
        <div className={styles.logo}>
          <img src={imagem} alt="Sem foto" width={ 60 } />
          <div className={styles.nome}>
            <h1>Gestao</h1>
            <h2>de Sala</h2>
          </div>
        </div>
      </div>
    </div>
  );
}






