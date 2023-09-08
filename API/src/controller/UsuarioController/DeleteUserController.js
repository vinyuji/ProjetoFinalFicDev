const { UserModel } = require('../../model/UsuarioModel');

// Deletar User
class DeleteUserController {
    async DeleteUser(req, res) {
        const { Cpf } = req.params;
        try {
          const deletedRows = await UserModel.destroy({
            where: { Cpf },
          });
          if (deletedRows === 0) {
            res.status(404).json({ error: 'User não encontrada' });
          } else {
            res.status(200).json({ message: 'User excluída com sucesso' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao excluir User' });
        }
      }
}

module.exports = new DeleteUserController();