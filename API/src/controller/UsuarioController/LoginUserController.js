const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { UsuarioModel } = require('../../model/UsuarioModel');

/* Entra com o usuário e retorna um token de acesso */
class LoginUserController {
    async LoginUser(request, response) {
        try {
            const { Email, Senha } = request.body;

            // Validar parâmetros
            if (!Email || !Senha) {
                return response.status(400).json({
                    error: 'Email e senha são obrigatórios!'
                });
            }

            // Verifica se usuário existe
            const ExistingUser = await UsuarioModel.findOne({
                where: { Email }
            });

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
                { id: UsuarioExiste.CPF },
                process.env.TOKEN_SECRET,
                { expiresIn: '1h' }
            );

            return response.status(200).json({ accessToken });
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }
}

module.exports = new LoginUserController();