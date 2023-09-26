import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import { Esquerda } from '../../components/Esquerda/Esqueda';
const API_URL = 'http://localhost:8080';

export function Home() {
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [capacidadeTotal, setCapacidadeTotal] = useState(0);
  
  useEffect(() => {
    fetchSalas();
    fetchReservas();
  }, []);
  async function fetchSalas() {
    try {
      const result = await fetch(`${API_URL}/sala`, { method: 'GET' });
      const salaData = await result.json();
  
      // Calcular a capacidade total somando a capacidade de todas as salas
      const capacidadeTotal = salaData.reduce(
        (total, sala) => total + sala.Capacidade,
        0
      );
  
      setSalas(salaData);
      setCapacidadeTotal(capacidadeTotal); // Adicionar esta linha
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchReservas() {
    try {
      const response = await fetch(`${API_URL}/reserva`, {
        method: 'GET',
      });
      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar as reservas.', error);
    }
  }

  function contarSalas() {
    return salas.length;
  }
  function contarReservas() {
    return reservas.length;
  }

  function calcularPorcentagemReservas() {
    if (salas.length === 0) {
      return 0; // Retorna 0% se não houver salas cadastradas
    }
  
    const porcentagem = (reservas.length / salas.length) * 100;
    return porcentagem.toFixed(2); // Retorna a porcentagem com duas casas decimais
  }

  return (
    <div className={styles.tudo}>
      <Esquerda></Esquerda>
      <div className={styles.direita}>
        <div className={styles.header}>
          <h1>DashBoard</h1>
          <div className={styles.linha1}></div>
        </div>
        <div className={styles.Dash}>
          <div className={styles.NaoDireita}>
            <div className={styles.Sala}>
              <h1>Total de salas</h1>
              <h2>{contarSalas()}</h2>
            </div>
            <div className={styles.Reservas}>
              <h1>Total de Reservas</h1>
              <h2>{contarReservas()}</h2>
            </div>
          </div>
          <div className={styles.NaoEsquerda}>
            <div className={styles.Capacidade}>
              <h1>Capacidade total das salas</h1>
              <h2>{capacidadeTotal}</h2>
            </div>
            <div className={styles.Porcentagem}>
              <h1>Porcentagem de salas reservadas</h1>
              <h2>{calcularPorcentagemReservas()}%</h2>
            </div>
          </div>
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
