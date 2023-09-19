const { UserModel } = require('../../model/UsuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cpf = require('cpf');
require('dotenv').config();
const validator = require('validator'); // Importe a biblioteca validator


class CreateUserController {
  async CreateUser(request, response) {
    try {
      const { Cpf, Nome, Cep, Senha, Email, FormacaoAcademica, TempoDeCurso, Especializacao } = request.body;

      console.log(Cpf)
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

      // Criptografia senha
      const SenhaHashed = await bcrypt.hash(
        Senha,
        Number(process.env.SALT)
      );


      // Criando a User
      const newUser = await UserModel.create({
        Cpf,
        Nome,
        Cep,
        Senha: SenhaHashed,
        Email,
        FormacaoAcademica,
        TempoDeCurso,
        Especializacao,
      });

      const accessToken = jwt.sign(
                { Cpf: newUser.Cpf },
                process.env.TOKEN_SECRET,
                { expiresIn: '1h' }
      );
      console.log(accessToken);
      return response.status(201).json({ accessToken });
    } catch (error) {
      return response.status(500).json({
        error: `Erro interno: ${error}`,
      });
    }
  }
}

module.exports = new CreateUserController();
