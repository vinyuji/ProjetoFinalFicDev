
const { ReservaModel } =  require ('../../model/ReservaModel.js')
// Sala
//Buscar Sala
class SalaController {
    async FindReserva (req, res) {
        try {
            const reserva = await ReservaModel.findAll();
            return res.status(200).json(reserva);
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    };

    async GetReserva (req, res){
        try {
            const { IdReserva } = req.params;
            const reserva = await ReservaModel.findByPk(IdReserva);

            if (!reserva) {
                return res.status(404).json({
                    error: 'reserva não foi encontrada!'
                });
            }
            return res.status(200).json(reserva);
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    };

    //deletetar Sala
    async DeleteReserva(req, res) {
        try {
            const { IdReserva } = req.params;
            const reservaExiste = await ReservaModel.findByPk(IdReserva);
            if (!reservaExiste) {
                return res.status(404).json({
                    error: 'sala não foi econtrada!'
                });
            }
            await ReservaModel.destroy({ where: { IdReserva } });
            return res.status(200).json({
                message: 'sala removida com sucesso!'
            });
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    };

    // Atualizar reserva
    async PutReserva(req, res){
        try {
            const { IdReserva } = req.params;
            const { IdSala, DataReserva, Capacidade, Cpf } = req.body;
            const reservaExistente = await ReservaModel.findByPk(IdReserva);
            if (!reservaExistente) {
                return res.status(404).json({
                    error: 'Reserva não foi encontrada!'
                });
            }
            await reservaExistente.update({
                IdSala,
                DataReserva, 
                Capacidade, 
                Cpf,
            });
            return res.status(200).json(reservaExistente);
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    };

    // Criar Reserva
    async CreateReserva (req, res) {
        try {
            const { Sala, NumeroSala, PessoaReservista, IdSala, Funcao, DataReserva, Cpf, Capacidade } = req.body;
            const NovaReserva = await ReservaModel.create({
                Sala, 
                NumeroSala, 
                PessoaReservista, 
                IdSala, 
                Funcao, 
                DataReserva,
                Cpf,
                Capacidade
            });
            return res.status(201).json(NovaReserva);
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    }
}

module.exports = new SalaController ();