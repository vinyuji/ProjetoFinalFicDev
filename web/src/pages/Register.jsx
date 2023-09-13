import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { registerUser } from "../services/user-services";

export function Register() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await registerUser(data);
            setResult(user);
            navigate('/foods');
        } catch (error) {
            setResult({
                title: 'Houve um erro no cadastro!',
                message: error.response.data.error
            });
        }
    }

    return (
        <div className="bg-dark text-light vh-100">
      <Container>
        <Modal
          show={result}
          title={result?.title}
          message={result?.message}
          handleClose={() => setResult(null)}
        />
        <Header title="Crie sua conta" />
        <Form
          noValidate
          validated={!!errors}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-dark rounded p-5 shadow w-50 m-auto"
        >
          <Col>
            <Input
              className="mb-4"
              label="E-mail"
              type="text"
              placeholder="Insira seu e-mail"
              error={errors.email}
              required={true}
              name="email"
              validations={register('email', {
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
            <Input
              className="mb-4"
              label="Senha"
              type="password"
              placeholder="Insira sua senha"
              error={errors.password}
              required={true}
              name="password"
              validations={register('password', {
                required: {
                  value: true,
                  message: 'Senha é obrigatório'
                }
              })}
            />
            <div className="d-flex justify-content-between">
              <Button type="submit" variant="primary">Criar</Button>
              <Link to="/">Já tenho uma conta</Link>
            </div>
          </Col>
        </Form>
      </Container>
    </div>
    );
}
