import React, { useState } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../utils/Esquerda/Esqueda';
import Lupa from '../../utils/lupa.png';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Sala() {
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
          <h1>Notificações</h1>
          <div className={styles.linha1}></div>
        </div>

        <div className={styles.Pesq}>
          <div className={`${styles.pesquisa} bootstrap-form`}>
            <input type="text" placeholder='Pesquisar por Id' />
            <button type='submit'>
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
          <h2>Mais</h2>
        </div>
        <div className={styles.linha1}></div>
      </div>

      {/* Modal do Bootstrap */}
      <Modal show={isModalOpen} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Adicione os campos do formulário de cadastro da sala aqui */}
          <form>
            <div className="mb-3">
              <label htmlFor="nomeSala" className="form-label">Nome da Sala</label>
              <input type="text" className="form-control" id="nomeSala" placeholder="Digite o nome da sala" />
            </div>
            <div className="mb-3">
              <label htmlFor="funcao" className="form-label">Função</label>
              <input type="text" className="form-control" id="funcao" placeholder="Digite a função da sala" />
            </div>
            {/* Adicione mais campos conforme necessário */}
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
  );
}
