import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Lupa from '../../components/lupa.png';
import Editi from '../../components/editar.png';
import Delete from '../../components/delete.png';
import { Modal, Button, Form } from 'react-bootstrap';
import cpf from 'cpf';
// import { Option } from '../../components/Option';
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
      if (!novaReserva.IdSala) {
        alert('É necessario selecionar a sala');
        return;
      }
      if (!novaReserva.Cpf) {
        alert('É necessario informar o Cpf');
        return;
      }
      if (!novaReserva.Capacidade) {
        alert('É necessario informar a Capacidade');
        return;
      }
  
      //verifica se o Cpf e valido
      if (!cpf.isValid(novaReserva.Cpf)) {
        alert("Cpf invalido");
        return;
      }
      // Verifique se a sala já está reservada para a data selecionada
      const dataSelecionada = new Date(novaReserva.DataReserva);

      const salaReservada = reservas.find((reserva) => {
        const dataReserva = new Date(reserva.DataReserva);
        console.log("Data formatada da nova reserva: ", dataSelecionada.toISOString().slice(0, 10));
        console.log("Data formatada da reserva existente: ", dataReserva.toISOString().slice(0, 10));
        const IdSalaCriada = reserva.IdSala.toString();
        const reservada = novaReserva.IdSala.toString();

        console.log("Id Sala Criada",IdSalaCriada);
        console.log("Id da reserva sala", reservada);
        // Compare as datas diretamente, excluindo as informações de fuso horário
        if (
          IdSalaCriada === reservada &&
          dataReserva.toISOString().slice(0, 10) === dataSelecionada.toISOString().slice(0, 10)
        ) {
          return true;
        }
        
        return false;
      });
      if (salaReservada) {
        alert('Esta sala já está reservada para esta data. Por favor, escolha outra sala ou data.');
        return;
      }

      
      
      
    
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
    const dia = String(dataObj.getDate() + 1).padStart(0, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); 
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
        <div style={{ maxHeight: '67vh', overflowY: 'auto', marginTop: '5vh', marginLeft:'2vw', width:'78vw'}}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id reserva</th>
                <th scope="col">IdSala</th>
                <th scope="col">Data reserva</th>
                <th scope="col">Qtd de pessoas</th>
                <th scope="col">Id reservador</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length > 0 ? (
                reservas.map((reserva) => {
                  return (
                    <tr key={reserva.IdReserva}>
                      <td>{reserva.IdReserva}</td>
                      <td>{reserva.IdSala}</td>
                      <td>{formatarData(reserva.DataReserva)}</td>
                      <td>{reserva.Capacidade}</td>
                      <td>{reserva.Cpf}</td>
                      <td>
                        <button onClick={() => handleOpenEditModal(reserva)} className={styles.Editar}>
                          <img src={Editi} alt="sem foto" width={20} />
                        </button>
                        <button onClick={() => deleteReserva(reserva.IdReserva)} className={styles.Editar}>
                          <img src={Delete} alt="sem foto" width={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">Lista de reservas vazia</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal show={isModalOpen} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <Form.Group className="mb-3">
              <Form.Label>Seleciona a Sala</Form.Label>
              <Form.Select
                onChange={(e) => {
                  const novaSalaId = e.target.value;
                  setNovaReserva({
                    ...novaReserva,
                    IdSala: novaSalaId,
                  });
                }}
              >
                <option disabled>Clique para selecionar</option>
                {salas && salas.length > 0
                  ? salas.map((sala, index) => (
                      <option key={index} value={sala.IdSala}>
                        {sala.NomeSala}
                      </option>
                    ))
                  : <></>}
              </Form.Select>
            </Form.Group>

                <div className="mb-3">
                  <label htmlFor="Capacidade" className="form-label">Qta de pessoas</label>
                  <input
                    type="integer"
                    className="form-control"
                    id="Capacidade"
                    placeholder="Digite a capacidade"
                    value={novaReserva.Capacidade}
                    onChange={(e) => setNovaReserva({ ...novaReserva, Capacidade: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="DataReserva" className="form-label">Data de reserva</label>
                  <input
                    type="date"
                    className="form-control"
                    id="DataReserva"
                    placeholder="Digite a função da sala"
                    value={novaReserva.DataReserva}
                    onChange={(e) => setNovaReserva({ ...novaReserva, DataReserva: e.target.value })}
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
                <Form.Select
                  onChange={(e) => {
                    const novaSalaId = e.target.value;
                      setReservaEditada({
                        ...reservaEditada,
                        IdSala: novaSalaId, // Usar salaSelecionada.IdSala
                      });
                  }}
                >
                  <option disabled>Clique para selecionar</option>
                  {salas && salas.length > 0
                    ? salas.map((sala, index) => (
                        <option key={index} value={sala.IdSala}>
                          {sala.NomeSala}
                        </option>
                      ))
                    : <></>}
                </Form.Select>
              </Form.Group>
              <div className="mb-3">
                <label htmlFor="Capacidade" className="form-label">Qtd de pessoas</label>
                <input
                  type="integer"
                  className="form-control"
                  name="Capacidade"
                  placeholder="Digite a quantidade de pessoas"
                  value={reservaEditada?.Capacidade || ''}
                  onChange={(e) => handleEditInputChange('Capacidade', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="DataReserva" className="form-label">Data de Reserva</label>
                <input
                  type="date"
                  className="form-control"
                  name="DataReserva"
                  placeholder="Digite o nome da sala"
                  value={reservaEditada?.DataReserva || ''}
                  onChange={(e) => handleEditInputChange('DataReserva', e.target.value)}
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
                <p>Data de Reserva: {formatarData(reservaBuscada.DataReserva)}</p>
                <p>Reservador: {reservaBuscada.Cpf}</p>
                <p>Capacidade: {reservaBuscada.Capacidade}</p>
              </div>
            </div>
          ) : (
            <p className={styles.list}>Sala não encontrada.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleOpenEditModal(reservaBuscada)} className={styles.EditarModal}>
            <img src={Editi} alt="sem foto" width={20} />
          </Button>
          <Button variant="secondary" onClick={() => deleteReserva(reservaBuscada.IdSala)} className={styles.EditarModal}>
            <img src={Delete} alt="sem foto" width={20} />
          </Button>
          <Button variant="secondary" onClick={closeSearchModal} className={styles.Fechar}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>

  );
}
