import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Chart from 'chart.js/auto';
const API_URL = 'http://localhost:8080';

export function Home() {
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [capacidadeTotal, setCapacidadeTotal] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchSalas();
    fetchReservas();
  }, []);

  useEffect(() => {
    if (salas.length > 0 && reservas.length > 0) {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');

        // Destrói o gráfico anterior, se existir
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }

        // Calcular o total de salas e reservas
        const totalSalas = contarSalas();
        const totalReservas = contarReservas();

        // Cria o gráfico de barras lado a lado
        chartRef.current.chart = new Chart(ctx, {
          type: 'bar', // Alterado para 'bar'
          data: {
            labels: ['Quantidade de Salas e Reservas'],
            datasets: [
              {
                label: 'Salas',
                data: [totalSalas],
                backgroundColor: 'blue', // Cor da barra das salas
                barPercentage: 0.5, // Espaçamento entre as barras
              },
              {
                label: 'Reservas',
                data: [totalReservas],
                backgroundColor: 'green', // Cor da barra das reservas
                barPercentage: 0.5, // Espaçamento entre as barras
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [salas, reservas]);

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
      setCapacidadeTotal(capacidadeTotal);
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
              <h2>Total de salas e reservas</h2>
              <canvas id="salaReservaChart" ref={chartRef}></canvas>
            </div>
          </div>
          <div className={styles.NaoEsquerda}>
            <div className={styles.Capacidade}>
              <h3>Capacidade total das salas</h3>
              <h1>{capacidadeTotal}</h1>
            </div>
            <div className={styles.Porcentagem}>
              <h3>Porcentagem de salas reservadas</h3>
              <h1>{calcularPorcentagemReservas()}%</h1>
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
