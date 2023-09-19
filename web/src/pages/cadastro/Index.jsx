import React, { useState } from 'react';
import styles from './styles.module.css';
import imagem from '../../utils/Esquerda/imagem.png';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { Input } from '../../components/Input';
import { registerUser } from '../../services/user-services';

export function Cadastro() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);

  async function onSubmit(data) {
    console.log(data);
  try {

      const user = await registerUser(data);
      setResult(user);
      console.log(result)
        if (user) {
          sessionStorage.setItem('token', user.data.accessToken);
          navigate('/Home');
        } else {
          setResult('Erro de cadastro');
        }
      } 
      catch (error) {
      setResult('Erro ao fazer cadastro');
      console.error('Erro ao fazer cadastro:', error);
  }
}

  return (
    <div className={styles.tudo}>
      <div className={styles.esquerda}>
        <div className={styles.logo}>
          <img src={imagem} alt="Sem foto" width={60} />
          <div className={styles.nome}>
            <h1>Gestao</h1>
            <h2>de Sala</h2>
          </div>
        </div>
      </div>
      <div className={styles.direita}>
        <div className={styles.login}>
          <h1>Cadastro</h1>
          <Form
            noValidate
            validated={!!errors}
            onSubmit={handleSubmit(onSubmit)}
            className="white rounded p-5  w-100 m-auto"
          >
            <Col>
              <Input
                className="mb-4"
                label="Nome"
                type="text"
                placeholder="Digite o Nome"
                error={errors.Nome}
                required={true}
                name="Nome"
                validates = {register('Nome', {
                  // value: true,
                  // required: 'Nome é obrigatório',
                })}
              />
              <Input
                className="mb-4"
                label="E-mail"
                type="text"
                placeholder="Digite o E-mail"
                error={errors.Email}
                required={true}
                name="Email"
                {...register('Email', {
                  value: true,
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                    message: 'E-mail inválido!',
                  },
                })}
              />
              <Input
                className="mb-4"
                label="Cpf"
                type="text"
                placeholder="Digite o Cpf"
                error={errors.Cpf}
                required={true}
                name="Cpf"
                {...register('Cpf', {
                  value: true,
                  required: 'Cpf é obrigatório',
                })}
              />
              <Input
                className="mb-4"
                label="Cep"
                type="text"
                placeholder="Digite o Cep"
                error={errors.Cep}
                required={true}
                name="Cep"
                {...register('Cep', {
                  value: true,
                  required: 'Cep é obrigatório',
                })}
              />
              <Input
                className="mb-4"
                label="Senha"
                type="password"
                placeholder="Digite a Senha"
                error={errors.Senha}
                required={true}
                name="Senha"
                {...register('Senha', {
                  value: true,
                  required: {
                    message: 'Senha é obrigatório'
                  }
                })}
              />
              <div className="d-flex flex-direction-column">
                <Button type="submit" className="w-100">Criar</Button>
              </div>
              <div className={styles.likedin}>
              <Link to="/" >Já tenho uma conta</Link>
              </div>
              
            </Col>
          </Form>
        </div>
      </div>
    </div>
  );
}
