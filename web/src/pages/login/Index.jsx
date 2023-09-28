import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import { Input } from "../../components/Input";
import imagem from '../../components/imagem.png';
import { loginUser } from '../../services/user-services';

export function Login() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data);
      console.log(user);
      console.log(user.data.accessToken)
      if (user) {
        localStorage.setItem('Cpf', user.data.Cpf);
        sessionStorage.setItem('token', user.data.accessToken);
        navigate('/Home');
      } else {
        setResult('Erro de autenticação');
      }
    } catch (error) {
      setResult('Erro ao fazer login');
      alert('Erro ao fazer login:', error);
    }
  }

  return (
    <div className={styles.tudo}>
      <div className={styles.esquerda}>
        <div className={styles.login}>
          <h1>LOGIN</h1>
          <Form
            noValidate
            validated={!!errors}
            onSubmit={handleSubmit(onSubmit)}
            className="white rounded p-5 w-100 m-auto"
          >
              <Input
                className="mb-4"
                label="Cpf"
                type="text"
                placeholder="Insira seu Cpf"
                error={errors.Cpf}
                required={true}
                name="Cpf"
                validations={register('Cpf', {
                  required: {
                    value: true,
                    message: 'Cpf é obrigatório'
                  },
                })}
              />
              <Input
                className="mb-4"
                label="Senha"
                type="password"
                placeholder="Insira sua senha"
                error={errors.password}
                required={true}
                name="Senha"
                validations={register('Senha', {
                  required: {
                    value: true,
                    message: 'Senha é obrigatório'
                  }
                })}
              />
              <div className="d-flex justify-content-between">
                <Button type="submit" className="w-100">Entrar</Button>
              </div>
          </Form>
          {result && <div className="mt-3 text-danger">{result}</div>}
          <div className={styles.cadastro}>
            <button>
              <Link to="/Cadastro">Não possui cadastro? Clique aqui</Link>
            </button>
          </div>
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
