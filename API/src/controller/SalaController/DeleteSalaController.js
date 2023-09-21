const { SalaModel } = require('../../model/SalaModel');

// Deletar Sala
class DeleteSalaController {
    async DeleteSala(req, res) {
        const { IdSala } = req.params;
        try {
          const deletedRows = await SalaModel.destroy({
            where: { IdSala },
          });
          if (deletedRows === 0) {
            res.status(404).json({ error: 'Sala não encontrada' });
          } else {
            res.status(200).json({ message: 'Sala excluída com sucesso' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao excluir sala' });
        }
      }
}

module.exports = new DeleteSalaController();