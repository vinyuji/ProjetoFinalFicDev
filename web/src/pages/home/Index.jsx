import React from 'react';
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import { Esquerda } from '../../components/Esquerda/Esqueda';
export function Home() {

  return (
    <div className={styles.tudo}>
      <Esquerda></Esquerda>
      <div className={styles.direita}>
        <div className={styles.header}>
          <h1>DashBoard</h1>
          <div className={styles.linha1}></div>
        </div>
        <div className={styles.notif}>
  

  
        </div>
        <div className={styles.rodape}>
          <Link to="/Reserva">
            <button>
              <h2>Listar salas Reservadas</h2>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

