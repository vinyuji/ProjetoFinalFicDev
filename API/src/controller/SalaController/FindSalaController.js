const { SalaModel } = require('../../model/SalaModel');

// Listar Sala por idSala
class GetSalaController {
  async GetSala(req, res) {
    try {
      const { Id } = req.params; // Usar req.params para acessar o parâmetro Id da URL

      if (Id) {
        // Se o ID estiver presente, pesquisa por ID
        const Sala = await SalaModel.findByPk(Id);
  
        if (!Sala) {
          return res.status(404).json({ error: 'Sala não encontrada' });
        }
  
        return res.status(200).json(Sala);
      } else {
        // Sem ID, retorna todas as salas
        const Salas = await SalaModel.findAll(); // Esta linha assume que você tem um método `findAll` para buscar todas as salas
        return res.status(200).json(Salas);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter Sala' });
    }
  }
}

module.exports = new GetSalaController();

