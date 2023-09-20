const { SalaModel } = require('../../model/SalaModel');

// Listar Sala por idSala
class GetSalaController {
  async GetSala(req, res) {
    try {
      const { Id } = req.params; // Usar req.params para acessar o parâmetro Id da URL
      const Sala = await SalaModel.findByPk(Id);
  
      if (!Sala) {
        return res.status(404).json({ error: 'Sala não encontrada' });
      }
  
      return res.status(200).json(Sala);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter Sala' });
    }
  }
}

module.exports = new GetSalaController();
