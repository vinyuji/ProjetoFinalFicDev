const { UserModel } = require('../../model/UsuarioModel');

// Deletar User
class DeleteUserController {
    async DeleteUser(request, response) {
        const { Cpf } = request.body;
        try {

          const deletedRows = await UserModel.destroy({
            where: { Cpf },
          });

          
          if (deletedRows === 0) {
            response.status(404).json({ error: 'User não encontrada' });
          } else {
            response.status(200).json({ message: 'User excluída com sucesso' });
          }



        } catch (error) {
          console.error(error);
          response.status(500).json({ error: 'Erro ao excluir User' });
        }
      }
}

module.exports = new DeleteUserController();