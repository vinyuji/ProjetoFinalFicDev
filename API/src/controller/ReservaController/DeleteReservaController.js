const { ReservaModel } = require('../../model/ReservaModel');


// Deletar reserva
class DeleteReservaController {
    async DeleteReserva(req, res) {
        const { IdReserva } = req.body;
        try {
          const deletedRows = await ReservaModel.destroy({
            where: { IdReserva },
          });
          if (deletedRows === 0) {
            res.status(404).json({ error: 'Reserva não encontrada' });
          } else {
            res.status(200).json({ message: 'Reserva excluída com sucesso' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao excluir reserva' });
        }
      }
}

module.exports = new DeleteReservaController();