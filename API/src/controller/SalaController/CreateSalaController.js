const { SalaModel } = require('../../model/SalaModel');


// Criar Sala
class CreateSalaController {
    async CreateSala (request, response) {
    try {
        const { NomeSala, Funcao, TipoSala, NumeroSala, Capacidade } = request.body;
        
        // verifica se todos os parametros importantes foram preenchidos
        if( !NomeSala || !Funcao || !TipoSala || !NumeroSala || !Capacidade ){
            return response.status(400).json({
                error: 'Parametros não atendidos'
            });
        }

        // criando a Sala
        const Func = await SalaModel.create({
            NomeSala,
            Funcao,
            TipoSala,
            NumeroSala,
            Capacidade,
        });

        return response.status(201).json( Func );
    } catch (error) {
        return response.status(500).json({
            error:`Erro interno': ${error}`
        });
    }
   }
}

module.exports = new CreateSalaController();