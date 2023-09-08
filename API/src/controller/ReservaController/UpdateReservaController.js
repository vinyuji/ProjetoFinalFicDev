const { ReservaModel } = require('../../model/ReservaModel');

// Atualizar Reserva por IdReserva
class UpdateReservaController {
  async UpdateReserva(req, res) {
    const { IdReserva, Sala, FuncaoSala, NumeroSala, DataReserva, Capacidade, PessoaReservista, Status } = req.body;
    try {
      if (!IdReserva) {
        return res.status(400).json({ error: 'O campo IdReserva é obrigatório' });
      }

      const [updatedRows] = await ReservaModel.update(
        {
          Sala, 
          FuncaoSala, 
          NumeroSala, 
          DataReserva, 
          Capacidade, 
          PessoaReservista, 
          Status,
        },
        {
          where: { IdReserva }, // Critério de pesquisa com base no IdReserva
        }
      );

      if (updatedRows === 0) {
        res.status(404).json({ error: 'Nenhuma Reserva encontrada para atualização' });
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
