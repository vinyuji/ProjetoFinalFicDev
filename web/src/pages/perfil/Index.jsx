import React from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../utils/Esquerda/Esqueda';
import Editar from '../../utils/editar.png';

export function Perfil() {

  return (
    <div className={styles.tudo}>
      <Esquerda></Esquerda>
      <div className={styles.direita}>
        <div className={styles.header}>
          <h1>Notificacoes</h1>
          <div className={styles.linha1}></div>
        </div>
        <div className={styles.informacoes}>
          <h2>Informacoes pessoais</h2>
          <img src={ Editar } alt="sem foto" width={ 30 }/>
        </div>
        
        <div className={styles.Senha}>
        </div>
        <div className={styles.Extra}>
          <h2>Informacoes Extras</h2>
          <img src={ Editar } alt="sem foto" width={ 30 }/>
        </div>

      </div>
    </div>
  );
}

