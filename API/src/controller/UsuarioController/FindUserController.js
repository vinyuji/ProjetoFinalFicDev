const { UserModel } = require('../../model/UsuarioModel');

//Listar User
class GetUserController{
    async GetUser(req, res) {
        try {
          const User = await UserModel.findAll();
          res.status(200).json(User);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao obter User' });
        }
    }
}

module.exports = new GetUserController();