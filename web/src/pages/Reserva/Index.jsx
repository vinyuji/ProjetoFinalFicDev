import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Lupa from '../../components/lupa.png';

const API_URL = 'http://localhost:8080';
export function Reserva() {
  const [reservas, setReserva] = useState([]);
  const [novaReserva, setNovaReserva] = useState({
    IdSala: '',
    FuncaoSala: '', 
    NumeroSala: '', 
    DataReserva: '', 
    Capacidade: '', 
    Cpf: '', 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Criar uma reserva 
   async function CreateReserva() {
      try {
        if (!novaReserva.IdSala || !novaReserva.DataReserva || !novaReserva.Cpf ){
          alert ( 'IdSala, Data de Reserva e Cpf sao obrigatorios!' );
          return;
        }
        const result = await fetch(`${API_URL}/reserva`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novaReserva),
        });

        const novaReservaData = await result.json();
        if(result.status === 201 ) {
          alert('Reserva criada com sucesso!');
          setNovaReserva({
            IdSala: '',
            FuncaoSala: '', 
            NumeroSala: '', 
            DataReserva: '', 
            Capacidade: '', 
            Cpf: '', 
          });
          setReserva([...reservas, novaReservaData]);
          handleOpenModal(false)
        } else {
          alert(novaReservaData.error);
        }
      } catch (error) {
        console.error(error);
      }
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
            <input type="text" placeholder='Pesquisar por Id' />
            <button type='submit'>
              <img src={Lupa} alt="sem foto" width={30} />
            </button>
          </div>
          <div className={`${styles.ReservaSala} bootstrap-button`}>
            <button type='button' onClick={handleOpenModal}>
              <h3>Reservar Sala</h3>
            </button>
          </div>
        </div>

        <div className={styles.lista}>
          <h2>Sala</h2>
          <h2>Função</h2>
          <h2>Estado</h2>
        </div>
        <div className={styles.linha1}></div>
        
        <Modal show={isModalOpen} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Sala</Modal.Title>
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
              Reserva
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
}
