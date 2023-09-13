const { UserModel } = require('../../model/UsuarioModel');

// Atualizar dados do User
class UpdateUserDadosController {
  async UpdateUserDados(req, res) {
    const { Cpf } = req.params; // Obtenha o CPF dos parâmetros da URL
    const { Nome, Cep, Email } = req.body; // Obtenha os novos dados do corpo da solicitação

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

      // Atualize os dados do usuário com os novos dados fornecidos
      user.Nome = Nome;
      user.Cep = Cep;
      user.Email = Email;
      
      await user.save(); // Salve as alterações no banco de dados

      res.status(200).json({ message: 'Dados do usuário atualizados com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar dados do usuário' });
    }
  }
}

module.exports = new UpdateUserDadosController();
