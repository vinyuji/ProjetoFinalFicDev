const { SalaModel } = require('../../model/SalaModel');

//Atualizar Sala
class UpdateSalaController {
    async UpdateSala(req, res) {
        const { IdSala } = req.params;
        try {
          const [updatedRows] = await SalaModel.update(req.body, {
            where: { IdSala },
          });
          if (updatedRows === 0) {
            res.status(404).json({ error: 'Sala não encontrada' });
          } else {
            res.status(200).json({ message: 'Sala atualizada com sucesso' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao atualizar Sala' });
        }
    }
}



module.exports = new UpdateSalaController();