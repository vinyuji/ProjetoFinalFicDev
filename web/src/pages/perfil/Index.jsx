import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Esquerda } from '../../components/Esquerda/Esqueda';
import { userLogado } from '../../services/user-services';
import Lupa from '../../components/lupa.png'
import Localizacao from '../../components/Localizacao.png';
import perfil from '../../components/Perfil.png';

const API_URL = 'https://api.github.com/users';

export function Perfil() {
  const [user, setUser] = useState('');
  const [cepUrl, setcepUrl] = useState({});
  const [activeTab, setActiveTab] = useState('infoPessoais');
  const [usuario, setUsuario] = useState('');
  const [retornoAPI, setRetornoAPI] = useState(null);
  

  useEffect(() => {
    fetchLogado();
  },[]);


  //esta funcao vai puxar do sessionStorage o item token para que seja possivel a identificacao do usuario que foi logado
  //assim permitindo pegar o usuario e exibila, juntamente com o cep para que possa fazer uma api-Publica via cep

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

  // vai pegar o cep achado no login e usara para fazer uma consulta via cep publica 
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

  //esta fucao ira permitir mostrar somente as informacoes que um determinado botao for clicado

  const handleTabClick = (tabId) => {
    setActiveTab(tabId); 
  };

  // aqui ira mostrar as informacoes de usuario, cujo o cep foi resgatado pelo token
  async function consultarUser() {
    const result = await fetch(`${API_URL}/${usuario}`)
    const data = await result.json()
    setRetornoAPI(data)
    console.log(data)
}

  return (
    <div className={styles.tudo}>
      <Esquerda></Esquerda>
      <div className={styles.direita}>
        <div className={styles.header}>
          <h1>Perfil</h1>
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
              <div className={styles.Fotinhas}>
                  <a
                    className={`nav-link ${activeTab === 'localizacao' ? 'active custom-bg' : 'custom-bg'}`}
                    href="#localizacao"
                    onClick={() => handleTabClick('localizacao')}
                  >
                    Moradia
                  </a>
              </div>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === 'Github' ? 'active custom-bg' : 'custom-bg'}`}
                href="#Github"
                onClick={() => handleTabClick('Github')}
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.infosGerais}>
          <div id='infoPessoais' style={{ display: activeTab === 'infoPessoais' ? 'block' : 'none' }}>
            <div className={styles.Fotinhas2}>
              <div className={styles.foto2}>
                <h4>Nome</h4>
                <h4 className={styles.blocos}>{user.Nome}</h4>
                <h4>Cpf</h4>
                <h4 className={styles.blocos}>{user.Cpf}</h4>
                <h4>Email</h4>
                <h4 className={styles.blocos}>{user.Email}</h4>
                <h4>Cep</h4>
                <h4 className={styles.blocos}>{user.Cep}</h4>
              </div>
              <div>
                <img src={perfil} alt="sem foto" width={200}/>
              </div>
            </div>
          </div>
          <div id='localizacao' style={{ display: activeTab === 'localizacao' ? 'block' : 'none' }}>
            <div className={styles.Fotinhas}>
                <div className={styles.foto}>
                  <h5>Cep</h5>
                  <h4 className={styles.blocos}>{user.Cep}</h4>
                  <h5>Uf</h5>
                  <h4 className={styles.blocos}>{cepUrl.uf}</h4>
                  <h5>Cidade</h5>
                  <h4 className={styles.blocos}>{cepUrl.localidade}</h4>
                  <h5>Bairro</h5>
                  <h4 className={styles.blocos}>{cepUrl.bairro}</h4>
                  <h5>Logradouro</h5>
                  <h4 className={styles.blocos}>{cepUrl.logradouro}</h4>
                </div>
                <div>
                    <img src={Localizacao} alt="sem foto" width={400}/>
                </div>
              </div>
          </div>
          <div id='Github' style={{ display: activeTab === 'Github' ? 'block' : 'none' }}>
            <div className={styles.BUSCAS}> 
                          <input className={styles.INPUT} type="text" value={usuario} onChange={(e) => { setUsuario(e.target.value) }} placeholder='Digite o nick que deseja buscar'/>
                          <button className={styles.BOTAO}>
                            <img onClick={consultarUser} src={Lupa} alt="sem foto" width={35} height={35}/>
                          </button>                        
            </div>
            <div className={styles.API}>
              {retornoAPI
                            ?
                            <div className={styles.dados}>
                                <div className={styles.foto}>
                                    <h3>Foto de Perfil:</h3>
                                    <img src={retornoAPI.avatar_url} alt="sem foto" width={170} className='foto2'/>
                                </div>
                                <div>
                                  <p>Nome: {retornoAPI.name}</p> 
                                  <p>NickName: {retornoAPI.login}</p> 
                                  <p>Html_Url: {retornoAPI.html_url}</p>
                                  <p>Email: {retornoAPI.email}</p>
                                  <p>Bio: {retornoAPI.bio}</p>
                                  <p>Repositorio: {retornoAPI.public_repos}</p>
                                </div>
                            </div>
                            : 
                            <div className="dados">
                                <p>Pesquise o GitHub de alguem</p>
                            </div>  
                    }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

