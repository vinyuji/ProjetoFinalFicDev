const { SalaModel } = require('../../model/SalaModel');

// Listar Sala por idSala
class GetSalaController {
  async GetSala(req, res) {
    try {
      const { IdSala } = req.body;

      if (!IdSala) {
        return res.status(400).json({ error: 'O parâmetro idSala é obrigatório' });
      }

      const Sala = await SalaModel.findByPk(IdSala); // Procura a sala pelo idSala

      if (!Sala) {
        return res.status(404).json({ error: 'Sala não encontrada' });
      }

      res.status(200).json(Sala);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter Sala' });
    }
  }
}

module.exports = new GetSalaController();
