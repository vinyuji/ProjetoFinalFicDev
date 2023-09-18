import React from 'react';
import styles from './styles.module.css';
import imagem from '../../utils/Esquerda/imagem.png'; 
import { Link } from "react-router-dom";

export function Login() {


  return (
    <div className={styles.tudo}>
      <div className={styles.esquerda}>
        <div className={styles.login}>
          <h1>LOGIN</h1>
              <button type="submit" className={styles.Entrar}>Entrar</button>
            <div className={styles.cadastro}>
              <button>
                <Link to="/Cadastro">Não possui cadastro? Clique aqui</Link>
              </button>
            </div>
        </div>
      </div>
      <div className={styles.direita}>
        <div className={styles.logo}>
          <img src={imagem} alt="Sem foto" width={60} />
          <div className={styles.nome}>
            <h1>Gestão</h1>
            <h2>de Sala</h2>
          </div>
        </div>
      </div>
    </div>
  );
}







