import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import Lupa from '../../components/lupa.png';
import Editi from '../../components/editar.png';
import Delete from '../../components/delete.png';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:8080';

export function Sala() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [salas, setSalas] = useState([]);
  const [salaEditada, setSalaEditada] = useState(null);
  const [salaBuscada, setSalaBuscada] = useState(null);
  const [novaSala, setNovaSala] = useState({
    NomeSala: '',
    Funcao: '',
    TipoSala: '',
    NumeroSala: '',
    Capacidade: '',
    Criador: '',
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

  const handleOpenEditModal = (sala) => {
    setIsEditModalOpen(true);
    setSalaEditada(sala);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSalaEditada(null);
  };

  async function fetchSalas() {
    try {
      const result = await fetch(`${API_URL}/sala`, { method: 'GET' });
      const salaData = await result.json();
      setSalas(salaData);
    } catch (error) {
      console.error(error);
    }
  }

  async function buscarSalaPorId() {
    if (!PesquisarId) {
      fetchSalas();
      return;
    }
    try {
      const response = await fetch(`${API_URL}/sala/${PesquisarId}`, {
        method: 'GET',
      });

      if (response.status === 200) {
        const salaEncontrada = await response.json();
        setSalaBuscada(salaEncontrada);
      } else if (response.status === 404) {
        alert('Sala não encontrada.');
        setSalaBuscada(null);
      } else {
        console.error('Ocorreu um erro ao buscar a sala.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao buscar a sala', error);
    }
  }

  async function editSala() {
    try {
      const result = await fetch(`${API_URL}/sala/${salaEditada.IdSala}`, {
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
          prevSalas.map((sala) => {
            if (sala.IdSala === salaEditada.IdSala) {
              return {
                ...sala,
                NomeSala: salaEditadaData.NomeSala,
                Funcao: salaEditadaData.NomeSala,
              };
            }
            return sala;
          })
        );
        setSalaEditada(null);
        setIsEditModalOpen(false);
      } else {
        alert(salaEditadaData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createSala() {
    try {
      if (!novaSala.NomeSala || !novaSala.Funcao || !novaSala.Criador) {
        alert('O nome, a função e o nome do criador são obrigatórios');
        return;
      }

      const result = await fetch(`${API_URL}/sala`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaSala),
      });

      const novaSalaData = await result.json();
      if (result.status === 201) {
        alert('Sala criada com sucesso!');
        setNovaSala({
          NomeSala: '',
          Funcao: '',
          TipoSala: '',
          NumeroSala: '',
          Capacidade: '',
          Criador: '',
        });
        setSalas([...salas, novaSalaData]);
        setIsModalOpen(false)
      } else {
        alert(novaSalaData.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeSala(id) {
    if (!window.confirm('Tem certeza de que deseja excluir esta sala?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/sala/${id}`, {
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
            <button type='button' onClick={buscarSalaPorId}>
              <img src={Lupa} alt="sem foto" width={30} />
            </button>
          </div>
          <div className={styles.cadSala}>
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
        <div className={styles.lista2}>
          {salaBuscada !== null ? (
            <div key={salaBuscada.IdSala} className={styles.CaixaEdicao}>
              <div className={styles.CaixaMostrada}>
                <p>{salaBuscada.NomeSala}</p>
                <p>{salaBuscada.Funcao}</p>
                <p>{salaBuscada.Criador}</p>
                <p>{salaBuscada.Capacidade}</p>
              </div>
              <div>
                    <button onClick={() => handleOpenEditModal(salaBuscada)} className={styles.Editar}>
                      <img src={ Editi }  alt="sem foto" width={20}/>
                    </button>
                    <button onClick={() => removeSala(salaBuscada.IdSala)} className={styles.Editar}>
                      <img src={ Delete }  alt="sem foto" width={20}/>
                    </button>
              </div>
            </div>
          ) : salas.length > 0 ? (
            salas.map((sala) => (
              <div key={sala.IdSala} className={styles.SalaItem}>
                {salaEditada === sala ? (
                  <div className={styles.CaixaEdicao}>
                    
                  </div>
                ) : (
                  <div className={styles.CaixaEdicao}>
                    <div className={styles.CaixaMostrada}>
                      <p>{sala.NomeSala}</p>
                      <p>{sala.Funcao}</p>
                      <p>{sala.Criador}</p>
                      <p>{sala.Capacidade}</p>
                    </div>
                    <div>
                      <button onClick={() => handleOpenEditModal(salaBuscada)} className={styles.Editar}>
                        <img src={ Editi }  alt="sem foto" width={20}/>
                      </button>
                      <button onClick={() => removeSala(sala.IdSala)} className={styles.Editar}>
                        <img src={ Delete }  alt="sem foto" width={20}/>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={styles.list}>Lista de salas vazia</p>
          )}
        </div>
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
