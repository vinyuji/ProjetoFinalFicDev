const { ReservaModel } = require('../../model/ReservaModel');


// Criar Reserva
class CreateReservaController {
    async CreateReserva (request, response) {
    try {
        const { Sala, FuncaoSala, NumeroSala, DataReserva, Capacidade, PessoaReservista, Status } = request.body;

        // verifica se todos os parametros importantes foram preenchidos
        if( !Sala || !FuncaoSala || !NumeroSala || !DataReserva || !Capacidade || !PessoaReservista || !Status){
            return response.status(400).json({
                error: 'Parametros não atendidos'
            });
        }

        // criando a Reserva
        const Func = await ReservaModel.create({
            Sala,
            FuncaoSala,
            NumeroSala,
            DataReserva,
            Capacidade,
            PessoaReservista,
            Status,
        });

        return response.status(201).json( Func );
    } catch (error) {
        return response.status(500).json({
            error:`Erro interno': ${error}`
        });
    }
   }
}

module.exports = new CreateReservaController();