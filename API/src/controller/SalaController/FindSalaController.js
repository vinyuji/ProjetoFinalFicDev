const { SalaModel } = require('../../model/SalaModel');

//Listar Sala
class GetSalaController {
    async GetSala(req, res) {
        try {
          const Sala = await SalaModel.findAll();
          res.status(200).json(Sala);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao obter Sala' });
        }
    }
}

module.exports = new GetSalaController();