import React from 'react';
import styles from './styles.module.css';
import imagem from '../login/imagem.png';
import { Link } from "react-router-dom";

export function Cadastro() {
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
            <input type="text" className={styles.personalizada} placeholder="Digite o Nome"/>
            </div>
            <div class="form-group">
              <input type="email" className={styles.personalizada} placeholder="Digite o E-mail"/>
            </div>
            <div class="form-group">
            <input type="text" className={styles.personalizada} placeholder="Digite o Cpf"/>
            </div>
            <div class="form-group">
            <input type="text" className={styles.personalizada} placeholder="Digite o Cep"/>
            </div>
            <div class="form-group">
            <input type="password" className={styles.personalizada} placeholder="Digite a Senha"/>
            </div><div class="form-group">
            <input type="password" className={styles.personalizada} placeholder="Confirmar Senha"/>
            </div>
            <button type="submit" class={styles.Entrar}>Cadastrar</button>
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






