import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Lupa from '../../components/lupa.png';
import Editi from '../../components/editar.png';
import Delete from '../../components/delete.png';
import { Modal, Button, Form } from 'react-bootstrap';
import { Option } from '../../components/Option';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_URL = 'http://localhost:8080';

export function Reserva() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reservaEditada, setReservaEditada] = useState(null);
  const [reservaBuscada, setReservaBuscada] = useState(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [salas, setSalas] = useState([]);
  const [PesquisarId, setPesquisarId] = useState('');
  const [novaReserva, setNovaReserva] = useState({
    IdSala: '',
    FuncaoSala: '',
    NumeroSala: '',
    DataReserva: '',
    Capacidade: '',
    Cpf: '',
  });


  const openSearchModal = () => {
    fetchReservas();
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    fetchReservas();    
    setIsSearchModalOpen(false);
  };

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
    fetchSalas();
    fetchReservas();
  }, []);

  async function fetchSalas() {
    try {
      const result = await fetch(`${API_URL}/sala`, { method: 'GET' });
      const salaData = await result.json();
      setSalas(salaData);
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
      fetchReservas();
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

  function formatarData(data) {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // +1 porque os meses começam em 0
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
  }


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
            <button type='button' onClick={() => {buscarReservaPorId(); openSearchModal();}}>
              <img src={Lupa} alt="sem foto" width={30} />
            </button>
          </div>
          <div className={styles.cadSala}>
            <button type='button' onClick={handleOpenModal}>
              <h3>Reservar</h3>
            </button>
          </div>
        </div>
        <div className={styles.lista}>
          <div>
            <h3>Id reserva</h3>
          </div>
          <div className={styles.listaId}>
            <h3>Id sala</h3>
          </div>
          <div>
            <h3>Data reserva</h3>
          </div>
          <div>
            <h3>Capacidade</h3>
          </div>
          <div>
            <h3>Id reservador</h3>
          </div>
        </div>
        <div className={styles.linha1}></div>
        <div className={styles.lista2}>
          <div className={styles.scrollContainer}>
              {reservas.length > 0 ? (
                reservas.map((reserva) => (
                  <div key={reserva.IdReserva} className={styles.ReservaItem}>
                    {reservaEditada === reserva ? (
                      <div className={styles.CaixaEdicao}>
                      </div>
                    ) : (
                      <div className={styles.CaixaEdicao}>
                        <div className={styles.CaixaMostrada}>
                          <p>{reserva.IdReserva}</p>
                          <p>{reserva.IdSala}</p>
                          <p>{formatarData(reserva.DataReserva)}</p>
                          <p>{reserva.Capacidade}</p>
                          <p>{reserva.Cpf}</p>
                        </div>
                        <div>
                          <button onClick={() => handleOpenEditModal(reserva)} className={styles.Editar}>
                            <img src={Editi} alt="sem foto" width={20} />
                          </button>
                          <button onClick={() => deleteReserva(reserva.IdReserva)} className={styles.Editar}>
                            <img src={Delete} alt="sem foto" width={20} />
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              ))
            ) : (
              <p className={styles.list}>Lista de reservas vazia</p>
            )}
          </div>
        </div>
        </div>

        <Modal show={isModalOpen} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <Form.Group className="mb-3">
                <Form.Label>Seleciona a Sala</Form.Label>
                <Form.Select onChange={(e) => setNovaReserva({ ...novaReserva, IdSala: e.target.value })}>
                  <option disabled>Clique para selecionar</option>
                  {salas && salas.length > 0
                    ? salas.map((sala, index) => (
                      <Option
                        key={index}
                        id={sala.IdSala}
                        nome={sala.NomeSala}
                        />
                    ))
                      :<></>}
                </Form.Select>
            </Form.Group>
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

      <Modal show={isEditModalOpen} onHide={handleCloseEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <Form.Group className="mb-3">
                <Form.Label>Seleciona a Sala</Form.Label>
                <Form.Select onChange={(e) => setNovaReserva({ ...novaReserva, IdSala: e.target.value })}>
                  <option disabled>Clique para selecionar</option>
                  {salas && salas.length > 0
                    ? salas.map((sala, index) => (
                      <Option
                        key={index}
                        id={sala.IdSala}
                        nome={sala.NomeSala}
                        />
                    ))
                      :<></>}
                </Form.Select>
            </Form.Group>
              <div className="mb-3">
                <label htmlFor="DataReserva" className="form-label">Data de Reserva</label>
                <input
                  type="text"
                  className="form-control"
                  name="DataReserva"
                  placeholder="Digite o nome da sala"
                  value={reservaEditada?.DataReserva || ''}
                  onChange={(e) => handleEditInputChange('DataReserva', e.target.value)}
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
                <label htmlFor="Cpf" className="form-label">Cpf</label>
                <input
                  type="text"
                  className="form-control"
                  name="Cpf"
                  placeholder="Digite o Cpf Do reservador"
                  value={reservaEditada?.Cpf || ''}
                  onChange={(e) => handleEditInputChange('Cpf', e.target.value)}
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

        <Modal show={isSearchModalOpen} onHide={closeSearchModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado da Pesquisa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reservaBuscada !== null ? (
            <div key={reservaBuscada.IdReserva} className={styles.CaixaEdicao}>
              <div className={styles.modalSearch}>
                <p>IdSala: {reservaBuscada.IdSala}</p>
                <p>Data de Reserva: {reservaBuscada.DataReserva}</p>
                <p>Reservador: {reservaBuscada.Cpf}</p>
                <p>Capacidade: {reservaBuscada.Capacidade}</p>
              </div>
              <div>
                <button onClick={() => handleOpenEditModal(reservaBuscada)} className={styles.Editar}>
                  <img src={Editi} alt="sem foto" width={20} />
                </button>
                <button onClick={() => deleteReserva(reservaBuscada.IdSala)} className={styles.Editar}>
                  <img src={Delete} alt="sem foto" width={20} />
                </button>
              </div>
            </div>
          ) : (
            <p className={styles.list}>Sala não encontrada.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeSearchModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
