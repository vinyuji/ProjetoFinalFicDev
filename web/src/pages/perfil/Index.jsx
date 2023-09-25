import React from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Editar from '../../components/editar.png';

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
        {/* <div className={styles.Pessoais}>
          <div className={styles.NomeLocal}>
              <p>{perfil.Nome}</p>
              <p>{perfil.Email}</p>
              <p>{perfil.Estado}</p>
              <p>{perfil.Rua}</p>
              <p>{perfil.Senha}</p>
          </div>
            <div clasName={styles.CepCpf}>
              <p>{perfil.Cpf}</p>
              <p>{perfil.Cep}</p>
              <p>{perfil.cidade}</p>
            </div>
        </div>        
        <div className={styles.Extra}>
          <h2>Informacoes Extras</h2>
          <img src={ Editar } alt="sem foto" width={ 30 }/>
        </div>
        <div className={styles.infosExtras}>
            <p>{perfil.FormacaoAcademica}</p>
            <p>{perfil.TempoCurso}</p>
            <p>{perfil.Especializacao}</p>
        </div> */}

      </div>
    </div>
  );
}

