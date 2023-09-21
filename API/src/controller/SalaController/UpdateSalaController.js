const { SalaModel } = require('../../model/SalaModel');

// Atualizar sala por IdSala
class UpdateSalaController {
  async UpdateSala(req, res) {
    const { IdSala } = req.params
    const { NomeSala, Funcao, TipoSala, NumeroSala, Capacidade, Criador} = req.body;
    try {
      if (!IdSala) {
        return res.status(400).json({ error: 'O campo IdSala é obrigatório' });
      }

      const [updatedRows] = await SalaModel.update(
        {
          NomeSala,
          Funcao,
          TipoSala,
          NumeroSala,
          Capacidade,
          Criador,
        },
        {
          where: { IdSala }, // Critério de pesquisa com base no IdSala
        }
      );

      if (updatedRows === 0) {
        res.status(404).json({ error: 'Nenhuma sala encontrada para atualização' });
      } else {
        res.status(200).json({ message: 'Sala atualizada com sucesso' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar sala' });
    }
  }
}

module.exports = new UpdateSalaController();
