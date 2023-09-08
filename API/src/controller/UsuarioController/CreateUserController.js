const { UserModel } = require('../../model/UsuarioModel');
const jwt = require('jsonwebtoken');
const cpf = require('cpf');
const validator = require('validator'); // Importe a biblioteca validator

const jwtSecret = 'suaChaveSecreta';

class CreateUserController {
  async CreateUser(request, response) {
    try {
      const { Cpf, Nome, Cep, Senha, Email, FormacaoAcademica, TempoDeCurso, Especializacao } = request.body;

      // Verifica se todos os parâmetros importantes foram preenchidos
      if (!Cpf || !Nome || !Cep || !Senha || !Email) {
        return response.status(400).json({
          error: 'Parâmetros não atendidos',
        });
      }

      // Verifica se o CPF fornecido é válido
      if (!cpf.isValid(Cpf)) {
        return response.status(400).json({
          error: 'CPF inválido',
        });
      }

      // Verifica se o CEP tem o formato correto (XXXXXXXX)
      const cepPattern = /^[0-9]{8}$/;
      if (!cepPattern.test(Cep)) {
        return response.status(400).json({
          error: 'CEP inválido',
        });
      }

      // Verifica se o e-mail tem o formato correto
      if (!validator.isEmail(Email)) {
        return response.status(400).json({
          error: 'E-mail inválido',
        });
      }

      // Verifica se já existe um usuário com o mesmo CPF no banco de dados
      const existingUser = await UserModel.findOne({
        where: { Cpf },
      });

      if (existingUser) {
        return response.status(400).json({
          error: 'CPF já cadastrado',
        });
      }

      // Criando a User
      const newUser = await UserModel.create({
        Cpf,
        Nome,
        Cep,
        Senha,
        Email,
        FormacaoAcademica,
        TempoDeCurso,
        Especializacao,
      });

      // Criando um token JWT para o CPF cadastrado
      const token = jwt.sign({ Cpf }, jwtSecret, { expiresIn: '1h' });

      return response.status(201).json({ newUser, token });
    } catch (error) {
      return response.status(500).json({
        error: `Erro interno: ${error}`,
      });
    }
  }
}

module.exports = new CreateUserController();
