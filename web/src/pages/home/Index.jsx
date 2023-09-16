import React from 'react';
import styles from './styles.module.css';
import imagem from '../login/imagem.png';
export function Home() {

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
        <div className={styles.opcoes}>


        </div>
      </div>
      <div className={styles.direita}>

          
      </div>

    </div>
  );
}

