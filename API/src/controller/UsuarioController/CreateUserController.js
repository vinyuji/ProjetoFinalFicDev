const { UserModel } = require('../../model/UsuarioModel');


// Criar User
class CreateUserController {
    async CreateUser (request, response) {
    try {
        const { Cpf, Nome, Cep, Senha, Email, FormacaoAcademica, TempoDeCurso, Especiaizacao } = request.body;

        // verifica se todos os parametros importantes foram preenchidos
        if( !Cpf || !Nome || !Cep || !Senha || !Email || !FormacaoAcademica || !TempoDeCurso || !Especiaizacao ){
            return response.status(400).json({
                error: 'Parametros não atendidos'
            });
        }

        // criando a User
        const Func = await UserModel.create({
            Cpf,
            Nome,
            Cep,
            Senha,
            Email,
            FormacaoAcademica,
            TempoDeCurso,
            Especiaizacao,
        });

        return response.status(201).json( Func );
    } catch (error) {
        return response.status(500).json({
            error:`Erro interno': ${error}`
        });
    }
   }
}

module.exports = new CreateUserController();