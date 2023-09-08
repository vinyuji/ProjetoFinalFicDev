const { UserModel } = require('../../model/UsuarioModel');

// Alterar senha do User
class UpdatePasswordController {
  async UpdatePassword(req, res) {
    const { Cpf } = req.params; // Obtenha o CPF dos parâmetros da URL
    const { Senha } = req.body; // Obtenha a nova senha do corpo da solicitação

    try {
      // Verifique se o CPF foi fornecido na URL
      if (!Cpf) {
        return res.status(400).json({ error: 'CPF não fornecido' });
      }

      // Consulte o banco de dados para encontrar o usuário com o CPF fornecido
      const user = await UserModel.findOne({ where: { Cpf } });

      // Verifique se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Atualize a senha do usuário com a nova senha fornecida
      user.Senha = Senha;
      await user.save(); // Salve as alterações no banco de dados

      res.status(200).json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao alterar senha' });
    }
  }
}

module.exports = new UpdatePasswordController();
