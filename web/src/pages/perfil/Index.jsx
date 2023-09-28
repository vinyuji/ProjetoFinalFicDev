import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Editar from '../../components/editar.png';
import{ userLogado } from '../../services/user-services';


export function Perfil() {
  const [user, setUser] = useState('');

  useEffect(() => {
    fetchLogado();
  }, []);

  async function fetchLogado() {
    try {
      const token = sessionStorage.getItem('token');
      const result = await userLogado(token);
      console.log(result);
      setUser(result.data.ExistingUser);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.tudo}>
      <Esquerda></Esquerda>
      <div className={styles.direita}>
        <div className={styles.header}>
          <h1>Notificacoes</h1>
          <div className={styles.linha1}></div>
        </div>
        <div className={styles.informacoes}>
          <div className={styles.header2}>
            <h2>Informacoes pessoais</h2>
            <img src={ Editar } alt="sem foto" width={ 30 }/>
          </div>
          <div>
            <div >
                <h3 className={styles.blocos}>{user.Nome}</h3>
                <h3 className={styles.blocos}>Cpf</h3>
                <h3 className={styles.blocos}>Email</h3>
                <h3 className={styles.blocos}>Cep</h3>
                <h3 className={styles.blocos}>Api Publica estado do </h3>

            </div>
            <div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

