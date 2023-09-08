const { ReservaModel } = require('../../model/ReservaModel');

//Atualizar reserva
class UpdateReservaController {
    async UpdateReserva(req, res) {
        const { IdReserva } = req.params;
        try {
          const [updatedRows] = await ReservaModel.update(req.body, {
            where: { IdReserva },
          });
          if (updatedRows === 0) {
            res.status(404).json({ error: 'Reserva não encontrada' });
          } else {
            res.status(200).json({ message: 'Reserva atualizada com sucesso' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao atualizar reserva' });
        }
    }
}



module.exports = new UpdateReservaController();