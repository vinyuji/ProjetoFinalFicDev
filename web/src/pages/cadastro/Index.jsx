import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import styles from './styles.module.css';

const API_URL = 'http://localhost:8080';

export function Sala() {
  const [Salas, setSalas] = useState([]);
  const [novaSala, setNovaSala] = useState({
    NomeSala: '',
    Funcao: '',
    TipoSala: '',
    NumeroSala: '',
    Capacidade: '',
  });
  const [salaEditada, setSalaEditada] = useState(null);
  const [showCadastroModal, setShowCadastroModal] = useState(false);

  useEffect(() => {
    getSalas();
  }, []);

  async function getSalas() {
    try {
      const result = await fetch(`${API_URL}/findSala`, { method: 'GET' });
      const SalasData = await result.json();
      setSalas(SalasData);
    } catch (error) {
      console.error(error);
    }
  }

  async function createSala() {
    try {
      if (!novaSala.NomeSala || !novaSala.NomeSala || !novaSala.Funcao || !novaSala.TipoSala || !novaSala.NumeroSala|| !novaSala.Capacidade ) {
        alert('todos os requisitos precisam ser preenchidos');
        return;
      }

      const result = await fetch(`${API_URL}/createSala`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaSala),
      });

      const novaSalaData = await result.json();
      if (result.status === 201) {
        alert('Sala criada com sucesso!');
        setNovaSala({ NomeSala: '', Funcao: '', TipoSala: '', NumeroSala: '', Capacidade: '' });
        setSalas([...Salas, novaSalaData]);
        setShowCadastroModal(false);
      } else {
        alert(novaSalaData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateSala() {
    try {
      const result = await fetch(`${API_URL}/upSala/${salaEditada.IdSala}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salaEditada),
      });

      const salaEditadaData = await result.json();
      if (result.status === 200) {
        alert('Sala atualizada com sucesso!');
        setSalas((prevSalas) =>
          prevSalas.map((sala) =>
            sala.IdSala === salaEditada.IdSala
              ? { ...sala, NomeSala: salaEditadaData.NomeSala, Funcao: salaEditadaData.funcao, TipoSala: salaEditadaData.TipoSala, NumeroSala: salaEditadaData.NumeroSala, Capacidade: salaEditadaData.Capacidade}
              : sala
          )
        );
        setSalaEditada(null);
      } else {
        alert(salaEditadaData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeSala(id) {
    try {
      const result = await fetch(`${API_URL}/Salas/${id}`, { method: 'DELETE' });
      const data = await result.json();
      if (result.status === 200) {
        alert(data.message);
        setSalas((prevSalas) => prevSalas.filter((sala) => sala.IdSala !== id));
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.tudo}>
      <h1>Salas</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Salas.map((sala) => (
            <tr key={sala.IdSala}>
              <td>{sala.IdSala}</td>
              <td>{sala.NomeSala}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    setSalaEditada(sala);
                    setShowCadastroModal(true);
                  }}
                >
                  Editar
                </Button>
                <Button variant="danger" onClick={() => removeSala(sala.IdSala)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => setShowCadastroModal(true)}>
        Cadastrar Sala
      </Button>

      <Modal show={showCadastroModal} onHide={() => setShowCadastroModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {salaEditada ? 'Editar Sala' : 'Criar Sala'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={salaEditada ? salaEditada.NomeSala : novaSala.NomeSala}
              onChange={(e) =>
                salaEditada
                  ? setSalaEditada({ ...salaEditada, NomeSala: e.target.value })
                  : setNovaSala({ ...novaSala, NomeSala: e.target.value })
              }
            />
          </div>
          <div>
            <label>Funcao:</label>
            <input
              type="text"
              value={salaEditada ? salaEditada.Funcao : novaSala.Funcao}
              onChange={(e) =>
                salaEditada
                  ? setSalaEditada({ ...salaEditada, Funcao: e.target.value })
                  : setNovaSala({ ...novaSala, Funcao: e.target.value })
              }
            />
          </div>
          <div>
            <label>Tipo da sala:</label>
            <input
              type="text"
              value={salaEditada ? salaEditada.TipoSala : novaSala.TipoSala}
              onChange={(e) =>
                salaEditada
                  ? setSalaEditada({ ...salaEditada, TipoSala: e.target.value })
                  : setNovaSala({ ...novaSala, TipoSala: e.target.value })
              }
            />
          </div>
          <div>
            <label>Numero da sala:</label>
            <input
              type="text"
              value={salaEditada ? salaEditada.NumeroSala : novaSala.NumeroSala}
              onChange={(e) =>
                salaEditada
                  ? setSalaEditada({ ...salaEditada, NumeroSala: e.target.value })
                  : setNovaSala({ ...novaSala, NumeroSala: e.target.value })
              }
            />
          </div>
          <div>
            <label>Capacidade:</label>
            <input
              type="text"
              value={salaEditada ? salaEditada.Capacidade : novaSala.Capacidade}
              onChange={(e) =>
                salaEditada
                  ? setSalaEditada({ ...salaEditada, Capacidade: e.target.value })
                  : setNovaSala({ ...novaSala, Capacidade: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCadastroModal(false)}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={salaEditada ? updateSala : createSala}
          >
            {salaEditada ? 'Atualizar' : 'Criar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

