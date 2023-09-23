import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Lupa from '../../components/lupa.png';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_URL = 'http://localhost:8080';

export function Reserva() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reservaEditada, setReservaEditada] = useState(null);
  const [reservaBuscada, setReservaBuscada] = useState(null);
  const [PesquisarId, setPesquisarId] = useState('');
  const [novaReserva, setNovaReserva] = useState({
    IdSala: '',
    FuncaoSala: '',
    NumeroSala: '',
    DataReserva: '',
    Capacidade: '',
    Cpf: '',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenEditModal = (sala) => {
    setIsEditModalOpen(true);
    setReservaEditada(sala);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setReservaEditada(null);
  };

  useEffect(() => {
    fetchReservas();
  }, []);

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

  async function buscarReservaPorId() {
    if (!PesquisarId) {
      fetchReservas();
      return;
    }
    try {
      const response = await fetch(`${API_URL}/reserva/${PesquisarId}`, {
        method: 'GET',
      });

      if (response.status === 200) {
        const reservaEncontrada = await response.json();
        setReservaBuscada(reservaEncontrada);
      } else if (response.status === 404) {
        alert('Reserva não encontrada.');
        setReservaBuscada(null);
      } else {
        console.error('Ocorreu um erro ao buscar a Reserva.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao buscar a Reserva', error);
    }
  }


  async function editReserva() {
    try {
      const result = await fetch(`${API_URL}/reserva/${reservaEditada.IdReserva}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaEditada),
      });

      const reservaEditadaData = await result.json();
      if (result.status === 200) {
        alert('Sala atualizada com sucesso!');
        setReservas((prevReserva) =>
          prevReserva.map((reserva) => {
            if (Reserva.IdReserva === reservaEditada.IdReserva) {
              return {
                ...Reserva,
                Sala: reservaEditadaData.Sala,
                FuncaoSala: reservaEditadaData.FuncaoSala,
              };
            }
            return reserva;
          })
        );
        setReservaEditada(null);
        setIsEditModalOpen(false);
      } else {
        alert(reservaEditadaData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function CreateReserva() {
    try {
      const response = await fetch(`${API_URL}/reserva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaReserva),
      });
      const novaReservaData = await response.json();

      if (response.status === 201) {
        alert('Reserva criada com sucesso!');
        setNovaReserva({
          IdSala: '',
          FuncaoSala: '',
          NumeroSala: '',
          DataReserva: '',
          Capacidade: '',
          Cpf: '',
        })
        setReservas([...reservas, novaReservaData]);
        setIsModalOpen(false);
        fetchReservas();
      } else {
        alert(novaReservaData.error);
      }
    } catch (error) {
      console.error('Ocorreu um erro ao criar a reserva', error);
    }
  }

  async function deleteReserva(IdReserva) {
    if (!window.confirm('Tem certeza de que deseja excluir esta reserva?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reserva/${IdReserva}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        alert('Reserva excluída com sucesso!');
        fetchReservas();
      } else if (response.status === 404) {
        console.error('Reserva não encontrada.');
      } else {
        console.error('Ocorreu um erro ao excluir a reserva.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao excluir a reserva', error);
    }
  }


  const handleEditInputChange = (field, value) => {
    setReservaEditada({
      ...reservaEditada,
      [field]: value,
    });
  };

  return (
    <div className={styles.tudo}>
      <Esquerda></Esquerda>
      <div className={styles.direita}>
        <div className={styles.header}>
          <h1>Reserva</h1>
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
            <button type='button' onClick={buscarReservaPorId}>
              <img src={Lupa} alt="sem foto" width={30} />
            </button>
          </div>
          <div className={`${styles.cadSala} bootstrap-button`}>
            <button type='button' onClick={handleOpenModal}>
              <h3>Reservar</h3>
            </button>
          </div>
        </div>
        <div className={styles.lista}>
          <h2>ID Reserva</h2>
          <h2>Data Reserva</h2>
          <h2>Capacidade</h2>
          <h2>Id Reservador</h2>
        </div>
        <div className={styles.linha1}></div>
        <div className={styles.lista2}>
          {reservaBuscada !== null ? (
            <div key={reservaBuscada.IdSala} className={styles.SalaItem}>
              <div>
                <p>{reservaBuscada.IdReserva}</p>
                <p>{reservaBuscada.DataReserva}</p>
                <p>{reservaBuscada.Capacidade}</p>
                <p>{reservaBuscada.Cpf}</p>
              </div>
              <div>
                <Button onClick={() => handleOpenEditModal(reservaBuscada)}>Editar</Button>
                <Button onClick={() => deleteReserva(reservaBuscada.IdReserva)}>Remover</Button>
              </div>
            </div>
          ) : reservas.length > 0 ? (
            reservas.map((reserva) => (
              <div key={reserva.IdReserva} className={styles.SalaItem}>
                {reservaEditada === reserva ? (
                  <div className={styles.CaixaEdicao}>
                    <div className="mb-3">
                      <label htmlFor="Sala" className="form-label">Nome da Sala</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Sala"
                        placeholder="Digite o nome da sala"
                        value={reservaEditada?.Sala || ''}
                        onChange={(e) => handleEditInputChange('Sala', e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.CaixaEdicao}>
                    <div>
                      <p>{reserva.IdSala}</p>
                      <p>{reserva.DataReserva}</p>
                      <p>{reserva.Capacidade}</p>
                      <p>{reserva.Cpf}</p>
                    </div>
                    <div>
                      <Button onClick={() => handleOpenEditModal(reserva)}>Editar</Button>
                      <Button onClick={() => deleteReserva(reserva.IdReserva)}>Remover</Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={styles.list}>Lista de reserva vazia</p>
          )}
        </div>
      </div>

        <Modal show={isModalOpen} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="IdSala" className="form-label">Id sala</label>
                <input
                  type="text"
                  className="form-control"
                  id="IdSala"
                  placeholder="Digite o Id da sala"
                  value={novaReserva.IdSala}
                  onChange={(e) => setNovaReserva({ ...novaReserva, IdSala: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="FuncaoSala" className="form-label">Função</label>
                <input
                  type="text"
                  className="form-control"
                  id="FuncaoSala"
                  placeholder="Digite a função da sala"
                  value={novaReserva.FuncaoSala}
                  onChange={(e) => setNovaReserva({ ...novaReserva, FuncaoSala: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="NumeroSala" className="form-label">Numero da sala</label>
                <input
                  type="text"
                  className="form-control"
                  id="NumeroSala"
                  placeholder="Digite a função da sala"
                  value={novaReserva.NumeroSala}
                  onChange={(e) => setNovaReserva({ ...novaReserva, NumeroSala: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="DataReserva" className="form-label">Data de reserva</label>
                <input
                  type="text"
                  className="form-control"
                  id="DataReserva"
                  placeholder="Digite a função da sala"
                  value={novaReserva.DataReserva}
                  onChange={(e) => setNovaReserva({ ...novaReserva, DataReserva: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Capacidade" className="form-label">Capacidade</label>
                <input
                  type="text"
                  className="form-control"
                  id="Capacidade"
                  placeholder="Digite a função da sala"
                  value={novaReserva.Capacidade}
                  onChange={(e) => setNovaReserva({ ...novaReserva, Capacidade: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Cpf" className="form-label">Cpf</label>
                <input
                  type="text"
                  className="form-control"
                  id="Cpf"
                  placeholder="Digite a função da sala"
                  value={novaReserva.Cpf}
                  onChange={(e) => setNovaReserva({ ...novaReserva, Cpf: e.target.value })}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
            <Button variant="primary" onClick={CreateReserva}>
              Reservar
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
                  value={reservaEditada?.NomeSala || ''}
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
                  value={reservaEditada?.Funcao || ''}
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
                  value={reservaEditada?.TipoSala || ''}
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
                  value={reservaEditada?.NumeroSala || ''}
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
                  value={reservaEditada?.Capacidade || ''}
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
                  value={reservaEditada?.Criador || ''}
                  onChange={(e) => handleEditInputChange('Criador', e.target.value)}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Fechar
            </Button>
            <Button variant="primary" onClick={editReserva}>
              Atualizar
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}
