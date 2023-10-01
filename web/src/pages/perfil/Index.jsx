import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import { userLogado } from '../../services/user-services';

export function Perfil() {
  const [user, setUser] = useState('');
  const [cepUrl, setcepUrl] = useState({});
  const [activeTab, setActiveTab] = useState('infoPessoais'); // Estado para controlar a guia ativa

  useEffect(() => {
    fetchLogado();
  },[]);

  async function fetchLogado() {
    try {
      const token = sessionStorage.getItem('token');
      const result = await userLogado(token);
      setUser(result.data.ExistingUser);
      fetchCep(result.data.ExistingUser.Cep);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCep(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Erro ao buscar CEP');
      }
      const cepData = await response.json();
      setcepUrl(cepData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId); 
  };

  return (
    <div className={styles.tudo}>
      <Esquerda></Esquerda>
      <div className={styles.direita}>
        <div className={styles.header}>
          <h2>Perfil</h2>
          <div className={styles.linha1}></div>
        </div>
        <div className={styles.header3}>
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item" >
              <a
                className={`nav-link ${activeTab === 'infoPessoais' ? 'active custom-bg' : 'custom-bg'}`}
                href="#infoPessoais"
                onClick={() => handleTabClick('infoPessoais')}
              >
                Perfil
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'localizacao' ? 'active custom-bg' : 'custom-bg'}`}
                href="#localizacao"
                onClick={() => handleTabClick('localizacao')}
              >
                Moradia
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'formacao' ? 'active custom-bg' : 'custom-bg'}`}
                href="#formacao"
                onClick={() => handleTabClick('formacao')}
              >
                Formacao
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.infosGerais}>
          <div id='infoPessoais' style={{ display: activeTab === 'infoPessoais' ? 'block' : 'none' }}>
              <div>
                <h4>Nome</h4>
                <h4 className={styles.blocos}>{user.Nome}</h4>
                <h4>Cpf</h4>
                <h4 className={styles.blocos}>{user.Cpf}</h4>
                <h4>Email</h4>
                <h4 className={styles.blocos}>{user.Email}</h4>
              </div>
          </div>
          <div id='localizacao' style={{ display: activeTab === 'localizacao' ? 'block' : 'none' }}>
              <div>
                <h4>Cep</h4>
                <h4 className={styles.blocos}>{user.Cep}</h4>
                <h4>Uf</h4>
                <h4 className={styles.blocos}>{cepUrl.uf}</h4>
                <h4>Cidade</h4>
                <h4 className={styles.blocos}>{cepUrl.localidade}</h4>
                <h4>Bairro</h4>
                <h4 className={styles.blocos}>{cepUrl.bairro}</h4>
                <h4>Logradouro</h4>
                <h4 className={styles.blocos}>{cepUrl.logradouro}</h4>
              </div>
          </div>
          <div id='formacao' style={{ display: activeTab === 'formacao' ? 'block' : 'none' }}>
            {/* Renderize informações de formação aqui */}
          </div>
        </div>
      </div>
    </div>
  );
}

