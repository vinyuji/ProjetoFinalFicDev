const { ReservaModel } = require('../../model/ReservaModel');

//Listar reserva
class GetReservaController{
    async GetReserva(req, res) {
        try {
          const reservas = await ReservaModel.findAll();
          res.status(200).json(reservas);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao obter reservas' });
        }
    }
}

module.exports = new GetReservaController();