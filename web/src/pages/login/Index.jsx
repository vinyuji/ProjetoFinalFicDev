import React from 'react';
import styles from './styles.module.css';
import imagem from './imagem.png'; 
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from '../../services/user-services';
import { Modal } from '../../utils/Modal';

export function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data);
      setResult(user);
    } catch (error) {
      setResult({
        title: 'Houve um erro no login!',
        message: error.response.data.error,
      });
    }
  }

  return (
    <div className={styles.tudo}>
      <Modal
        show={result}
        title={result?.title}
        message={result?.message}
        handleClose={() => setResult(null)}
      />
      <div className={styles.esquerda}>
        <div className={styles.login}>
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input 
                type="email" 
                className={styles.personalizada}
                aria-describedby="emailHelp" 
                placeholder="Digite o E-mail"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'E-mail é obrigatório'
                  },
                  pattern: {
                    value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                    message: 'E-mail inválido!'
                  }
                })}
              />
              {errors.email && <div className="error">{errors.email.message}</div>}
            </div>
            <div className="form-group">
              <input 
                type="password" 
                className={styles.personalizada} 
                placeholder="Digite a Senha" 
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Senha é obrigatória'
                  }
                })}
              />
              {errors.password && <div className="error">{errors.password.message}</div>}
            </div>
            <div className={styles.box}>
              <input 
                type="checkbox" 
                className={styles.checkbox}
                id="exampleCheck1"
              />
              <label className={styles.check} htmlFor="exampleCheck1">Manter conectado ao sistema</label>
            </div>
              <button type="submit" className={styles.Entrar}>Entrar</button>
            <div className={styles.cadastro}>
              <button>
                <Link to="/Cadastro">Não possui cadastro? Clique aqui</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.direita}>
        <div className={styles.logo}>
          <img src={imagem} alt="Sem foto" width={60} />
          <div className={styles.nome}>
            <h1>Gestão</h1>
            <h2>de Sala</h2>
          </div>
        </div>
      </div>
    </div>
  );
}







