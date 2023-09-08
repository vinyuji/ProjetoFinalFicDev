const { ReservaModel } = require('../../model/ReservaModel');

// Listar Sala por idSala
class GetReservaController {
  async GetReserva(req, res) {
    try {
      const { IdReserva } = req.body;

      if (!IdReserva) {
        return res.status(400).json({ error: 'O parâmetro IdReserva é obrigatório' });
      }

      const Reserva = await ReservaModel.findByPk(IdReserva); // Procura a Reserva pelo IdReserva

      if (!Reserva) {
        return res.status(404).json({ error: 'Reserva não encontrada' });
      }

      res.status(200).json(Reserva);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter Reserva' });
    }
  }
}

module.exports = new GetReservaController();
