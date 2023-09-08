const { UserModel } = require('../../model/UsuarioModel');

// Listar User por CPF
class GetUserController {
  async GetUser(req, res) {
    try {
      const { Cpf } = req.body; // Obtenha o CPF dos parâmetros da solicitação

      // Verifique se o CPF foi fornecido na solicitação
      if (!Cpf) {
        return res.status(400).json({ error: 'CPF não fornecido' });
      }

      // Consulta o banco de dados para encontrar o usuário com o CPF fornecido
      const user = await UserModel.findOne({ where: { Cpf } });

      // Verifique se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Retorne os dados do usuário encontrado
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter usuário' });
    }
  }
}

module.exports = new GetUserController();
