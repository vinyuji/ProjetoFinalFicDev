import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Lupa from '../../components/lupa.png';

export function Reserva() {
  const [novaSala, setNovaSala] = useState({
    NomeSala: '',
    Funcao: '',
    TipoSala: '',
    NumeroSala: '',
    Capacidade: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                <label htmlFor="nomeSala" className="form-label">Nome da Sala</label>
                <input
                  type="text"
                  className="form-control"
                  id="nomeSala"
                  placeholder="Digite o nome da sala"
                  value={novaSala.NomeSala}
                  onChange={(e) => setNovaSala({ ...novaSala, NomeSala: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="funcao" className="form-label">Função</label>
                <input
                  type="text"
                  className="form-control"
                  id="funcao"
                  placeholder="Digite a função da sala"
                  value={novaSala.Funcao}
                  onChange={(e) => setNovaSala({ ...novaSala, Funcao: e.target.value })}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
            <Button variant="primary">
              Cadastrar
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
}
