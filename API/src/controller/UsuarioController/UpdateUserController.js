const { UserModel } = require('../../model/UsuarioModel');

//Atualizar User
class UpdateUserController {
    async UpdateUser(req, res) {
        const { Cpf } = req.params;
        try {
          const [updatedRows] = await UserModel.update(req.body, {
            where: { Cpf },
          });
          if (updatedRows === 0) {
            res.status(404).json({ error: 'User não encontrada' });
          } else {
            res.status(200).json({ message: 'User atualizada com sucesso' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao atualizar User' });
        }
    }
}


module.exports = new UpdateUserController();