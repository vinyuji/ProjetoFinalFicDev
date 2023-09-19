// Sala.jsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Lupa from '../../components/lupa.png';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:8080';

export function Sala() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    NomeSala: '',
    Funcao: '',
    TipoSala: '',
    NumeroSala: '',
    Capacidade: '',
  });
  const [salas, setSalas] = useState([]);
  const [searchId, setSearchId] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleCadastroClick() {
    try {
      const response = await fetch(`${API_URL}/createSala`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        alert('Sala cadastrada com sucesso!');
        setIsModalOpen(false);
        fetchSalas();
      } else {
        alert('Ocorreu um erro ao cadastrar a sala.');
      }
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao cadastrar a sala.');
    }
  }

  async function fetchSalas() {
    try {
      const response = await fetch(`${API_URL}/findSala`);
      if (response.status === 200) {
        const data = await response.json();
        setSalas(data);
      } else {
        console.error('Ocorreu um erro ao buscar as salas.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao buscar as salas.', error);
    }
  }

  async function fetchSalaById(id) {
    try {
      const response = await fetch(`${API_URL}/findSala/:${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setSalas([data]);
      } else if (response.status === 404) {
        console.error('Sala não encontrada.');
      } else {
        console.error('Ocorreu um erro ao buscar a sala.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao buscar a sala por ID', error);
    }
  }

  async function handleSearchClick() {
    if (!searchId) {
      alert('Por favor, insira um ID de sala válido.');
      return;
    }
    await fetchSalaById(searchId);
  }

  async function handleDeleteClick(id) {
    if (!window.confirm('Tem certeza de que deseja excluir esta sala?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/deleteSala/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        alert('Sala excluída com sucesso!');
        fetchSalas();
      } else if (response.status === 404) {
        console.error('Sala não encontrada.');
      } else {
        console.error('Ocorreu um erro ao excluir a sala.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao excluir a sala', error);
    }
  }

  useEffect(() => {
    fetchSalas();
  }, []);

  return (
    <div className={styles.tudo}>
      <Esquerda></Esquerda>
      <div className={styles.direita}>
        <div className={styles.header}>
          <h1>Notificações</h1>
          <div className={styles.linha1}></div>
        </div>

        <div className={styles.Pesq}>
          <div className={`${styles.pesquisa} bootstrap-form`}>
            <input
              type="text"
              placeholder='Pesquisar por Id'
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button type='button' onClick={handleSearchClick}>
              <img src={Lupa} alt="sem foto" width={30} />
            </button>
          </div>
          <div className={`${styles.cadSala} bootstrap-button`}>
            <button type='button' onClick={handleOpenModal}>
              <h3>Cadastrar Sala</h3>
            </button>
          </div>
        </div>
        <div className={styles.lista}>
          <h2>Sala criada</h2>
          <h2>Função</h2>
          <h2>Criador</h2>
          <h2>Capacidade</h2>
        </div>
        <div className={styles.linha1}></div>
        {salas.map((sala) => (
          <div key={sala.IdSala}>
            <p>{sala.NomeSala}</p>
            <p>{sala.Funcao}</p>
            <p>{sala.Criador}</p>
            <p>{sala.Capacidade}</p>
            <button type="button" onClick={() => handleDeleteClick(sala.IdSala)}>Excluir</button>
          </div>
        ))}
      </div>

      <Modal show={isModalOpen} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="NomeSala" className="form-label">Nome da Sala</label>
              <input
                type="text"
                className="form-control"
                id="NomeSala"
                name="NomeSala"
                placeholder="Digite o nome da sala"
                value={formData.NomeSala}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Funcao" className="form-label">Função</label>
              <input
                type="text"
                className="form-control"
                id="Funcao"
                name="Funcao"
                placeholder="Digite a função da sala"
                value={formData.Funcao}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="TipoSala" className="form-label">Tipo da Sala</label>
              <input
                type="text"
                className="form-control"
                id="TipoSala"
                name="TipoSala"
                placeholder="Digite o tipo da sala"
                value={formData.TipoSala}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="NumeroSala" className="form-label">Número da Sala</label>
              <input
                type="text"
                className="form-control"
                id="NumeroSala"
                name="NumeroSala"
                placeholder="Digite o número da sala"
                value={formData.NumeroSala}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Capacidade" className="form-label">Capacidade</label>
              <input
                type="number"
                className="form-control"
                id="Capacidade"
                name="Capacidade"
                placeholder="Digite a capacidade da sala"
                value={formData.Capacidade}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleCadastroClick}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
