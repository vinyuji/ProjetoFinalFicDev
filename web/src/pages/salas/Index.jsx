import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Lupa from '../../components/lupa.png';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:8080';

export function Sala() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Adicionamos um novo estado para o modal de edição
  const [salas, setSalas] = useState([]);
  const [salaPesquisada, setSalaPesquisada] = useState(null);
  const [salaEditada, setSalaEditada] = useState(null);
  const [novaSala, setNovaSala] = useState({
    NomeSala: '',
    Funcao: '',
    TipoSala: '',
    NumeroSala: '',
    Capacidade: '',
  });
  const [PesquisarId, setPesquisarId] = useState('');

  useEffect(() => {
    fetchSalas();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true); // Abrir o modal de edição quando o botão "Editar" for clicado
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Fechar o modal de edição
  };

  async function fetchSalas() {
    try {
      const response = await fetch(`${API_URL}/findSala${PesquisarId ? `/${PesquisarId}` : ''}`, {
        method: 'GET',
      });
      const salaData = await response.json();
      if (PesquisarId) {
        setSalaPesquisada(salaData);
        setSalas([]);
      } else {
        setSalas(salaData);
        setSalaPesquisada(null);
      }
    } catch (error) {
      console.error('Ocorreu um erro ao buscar as salas.', error);
    }
  }

  async function selectSala(id) {
    const salaSelecionada = salas.find((sala) => sala.IdSala === id);
    setSalaEditada(salaSelecionada);
  }

  async function editSala() {
    try {
      if (!salaEditada.IdSala) {
        alert('O ID da sala é obrigatório');
        return;
      }
  
      const response = await fetch(`${API_URL}//upSala/${salaEditada.IdSala}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salaEditada),
      });
  
      if (response.status === 200) {
        alert('Sala atualizada com sucesso!');
        setSalaEditada(null);
        fetchSalas();
        handleCloseEditModal();
      } else {
        console.error('Ocorreu um erro ao atualizar a sala.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar a sala', error);
    }
  }

  async function createSala() {
    try {
      const response = await fetch(`${API_URL}/createSala`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaSala),
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

  async function removeSala(id) {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaSala({
      ...novaSala,
      [name]: value,
    });
  };

  const handleEditInputChange = (field, value) => {
    setSalaEditada({
      ...salaEditada,
      [field]: value,
    });
  };

  return (
    <div className={styles.tudo}>
      <Esquerda></Esquerda>
      <div className={styles.direita}>
        <div className={styles.header}>
          <h1>Sala</h1>
          <div className={styles.linha1}></div>
        </div>

        <div className={styles.Pesq}>
          <div className={`${styles.pesquisa} bootstrap-form`}>
            <input
              type="text"
              placeholder='Pesquisar por Id'
              value={PesquisarId}
              onChange={(e) => setPesquisarId(e.target.value)}
            />
            <button type='button' onClick={fetchSalas}>
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
        {(PesquisarId && salaPesquisada) || (!PesquisarId && salas.length > 0) ? (
      <ul>
        {PesquisarId && salaPesquisada ? (
          <li key={salaPesquisada.IdSala} className={styles.amostra}>
            <p>{salaPesquisada.NomeSala}</p>
            <p>{salaPesquisada.Funcao}</p>
            <p>{salaPesquisada.Capacidade}</p>
            <p>{salaPesquisada.Criador}</p>
            
            <button onClick={handleOpenEditModal}>Editar</button>
            <button onClick={() => removeSala(salaPesquisada.IdSala)}>Excluir</button>
          </li>
        ) : (
          salas.map((sala) => (
            <li key={sala.IdSala}>
              <p>CNPJ do Fornecedor: {sala.NomeSala}</p>
              <p>Data: {sala.Funcao}</p>
              <p>Valor: {sala.TipoSala}</p>
              {salaEditada && salaEditada.IdSala === sala.IdSala ? (
                <div className={styles.form}>
                  <input
                    type="text"
                    placeholder="CNPJ do Fornecedor"
                    value={salaEditada.NomeSala}
                    onChange={(e) =>
                      handleEditInputChange('NomeSala', e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Data"
                    value={salaEditada.Funcao}
                    onChange={(e) =>
                      handleEditInputChange('Funcao', e.target.value)
                    }
                  />
                  <button onClick={editSala}>Atualizar</button>
                </div>
              ) : (
                <>
                  <button onClick={() => selectSala(sala.IdSala)}>Editar</button>
                  <button onClick={() => removeSala(sala.IdSala)}>Excluir</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    ) : (
      <p>Não há Salas Disponíveis</p>
    )}
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
                name="NomeSala"
                placeholder="Digite o nome da sala"
                value={novaSala.NomeSala}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Funcao" className="form-label">Função</label>
              <input
                type="text"
                className="form-control"
                name="Funcao"
                placeholder="Digite a função da sala"
                value={novaSala.Funcao}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="TipoSala" className="form-label">Tipo da Sala</label>
              <input
                type="text"
                className="form-control"
                name="TipoSala"
                placeholder="Digite o tipo da sala"
                value={novaSala.TipoSala}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="NumeroSala" className="form-label">Número da Sala</label>
              <input
                type="text"
                className="form-control"
                name="NumeroSala"
                placeholder="Digite o número da sala"
                value={novaSala.NumeroSala}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Capacidade" className="form-label">Capacidade</label>
              <input
                type="number"
                className="form-control"
                name="Capacidade"
                placeholder="Digite a capacidade da sala"
                value={novaSala.Capacidade}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Criador" className="form-label">Criador</label>
              <input
                type="text"
                className="form-control"
                name="Criador"
                placeholder="Digite o Criador da sala"
                value={novaSala.Criador}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={createSala}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Edição */}
      <Modal show={isEditModalOpen} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="NomeSala" className="form-label">Nome da Sala</label>
              <input
                type="text"
                className="form-control"
                name="NomeSala"
                placeholder="Digite o nome da sala"
                value={salaEditada?.NomeSala || ''}
                onChange={(e) => handleEditInputChange('NomeSala', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Funcao" className="form-label">Função</label>
              <input
                type="text"
                className="form-control"
                name="Funcao"
                placeholder="Digite a função da sala"
                value={salaEditada?.Funcao || ''}
                onChange={(e) => handleEditInputChange('Funcao', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="TipoSala" className="form-label">Tipo da Sala</label>
              <input
                type="text"
                className="form-control"
                name="TipoSala"
                placeholder="Digite o tipo da sala"
                value={salaEditada?.TipoSala || ''}
                onChange={(e) => handleEditInputChange('TipoSala', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="NumeroSala" className="form-label">Número da Sala</label>
              <input
                type="text"
                className="form-control"
                name="NumeroSala"
                placeholder="Digite o número da sala"
                value={salaEditada?.NumeroSala || ''}
                onChange={(e) => handleEditInputChange('NumeroSala', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Capacidade" className="form-label">Capacidade</label>
              <input
                type="number"
                className="form-control"
                name="Capacidade"
                placeholder="Digite a capacidade da sala"
                value={salaEditada?.Capacidade || ''}
                onChange={(e) => handleEditInputChange('Capacidade', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Criador" className="form-label">Criador</label>
              <input
                type="text"
                className="form-control"
                name="Criador"
                placeholder="Digite o Criador da sala"
                value={salaEditada?.Criador || ''}
                onChange={(e) => handleEditInputChange('Criador', e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={editSala}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
