const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { UserModel } = require('../../model/UsuarioModel');

/* Entra com o usuário e retorna um token de acesso */
class LoginUserController {
    async GetLogin(request, response) {
        let { token } = request.body;
        try {
            const user = jwt.verify(
                token.replace(/"/g,""),
                process.env.TOKEN_SECRET,
            );

            console.log(user);
            const ExistingUser = await UserModel.findOne({
                where: { Cpf: user.cpf }
            });
            
            return response.status(200).json({ ExistingUser });
        } catch (error) {
            console.log(error);
            return response.status(500).json("Erro interno: ", error)
        }
      
    }
    async LoginUser(request, response) {
        try {
            const { Cpf, Senha } = request.body;

            // Validar parâmetros
            if (!Cpf || !Senha) {
                return response.status(400).json({
                    error: 'Cpf e senha são obrigatórios!'
                });
            }
            console.log("ok parametros", Senha);

            // Verifica se usuário existe
            const ExistingUser = await UserModel.findOne({
                where: { Cpf }
            });
            console.log("ok exites", ExistingUser);

            if (!ExistingUser) {
                return response.status(400).json({
                    error: 'Usuario não existe!'
                });
            }

            // Verifica se a senha está correta
            const SenhaValida = await bcrypt.compare(Senha, ExistingUser.Senha);

            if (!SenhaValida) {
                return response.status(400).json({
                    error: 'Senha incorreta!'
                });
            }

            // Gera e retorna o access token
            const accessToken = jwt.sign(
                { cpf: ExistingUser.Cpf},
                process.env.TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            console.log("ok", accessToken)
            return response.status(200).json({ accessToken });
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }
}

module.exports = new LoginUserController();
