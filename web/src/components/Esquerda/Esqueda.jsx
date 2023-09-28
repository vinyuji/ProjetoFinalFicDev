import React from 'react'; // Certifique-se de que está importando o React
import styles from  './styles.module.css';
import { Link } from 'react-router-dom';
import imagem from '../imagem.png';
import Close from '../Close.png';

export function Esquerda(){
    return(
        <div className={styles.esquerda}>
        <div className={styles.logo}>
          <img src={imagem} alt="Sem foto" width={ 60 } />
          <div className={styles.nome}>
            <h1>Gestao</h1>
            <h2>de Sala</h2>
          </div>
        </div>
        <div className={styles.linha}></div>
        <h1 className={styles.menu}>Menu</h1>
        <div className={styles.opcoes}>
          <Link to="/Home"><h3> DashBoard </h3></Link>
          <Link to="/Perfil"  ><h3> Perfil</h3></Link>
          <Link to="/Sala"><h3>Sala</h3></Link>
          <Link to="/Reserva"><h3>Reserva</h3></Link>
        </div>
        <div className={styles.Sair}>
          <Link to="/">
            <img src={Close} alt="sem foto" width={ 30 }  />
          </Link>
          <Link to="/"><h2>Sair</h2></Link>
        </div>
      </div>
    )
}
