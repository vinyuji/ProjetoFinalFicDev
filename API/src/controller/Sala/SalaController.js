const { Op } = require('sequelize');
const { SalaModel } = require ('../../model/SalaModel.js');

// Sala
//Buscar Sala
class SalaController {
    async FindSala (req, res) {
        try {
            const salas = await SalaModel.findAll();
            return res.status(200).json(salas);
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    };

    // Obter uma Sala por ID
    async GetSala (req, res){
        try {
            const { IdSala } = req.params;
            const sala = await SalaModel.findByPk(IdSala);
            if (!sala) {
                return res.status(404).json({
                    error: 'Sala não foi encontrada!'
                });
            }
            return res.status(200).json(sala);
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    };

    // Obter uma Sala por NomeSala
    async GetNomeSala (req, res){
        try {
            const { NomeSala } = req.params;
            console.log("Nome: ", NomeSala.NomeSala);
            const sala = await SalaModel.findAll({
                where: {
                  NomeSala
                },
              });
            if (!sala) {
                return res.status(404).json({
                    error: 'Sala não foi encontrada!'
                });
            }
            return res.status(200).json(sala);
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    };

    //deletetar Sala
    async DeleteSala(req, res) {
        try {
            const { IdSala } = req.params;
            const salaExiste = await SalaModel.findByPk(IdSala);
            if (!salaExiste) {
                return res.status(404).json({
                    error: 'sala não foi econtrada!'
                });
            }
            await SalaModel.destroy({ where: { IdSala } });
            return res.status(200).json({
                message: 'sala removida com sucesso!'
            });
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    };

    // Atualizar Sala
    async PutSala(req, res){
        try {
            const { IdSala } = req.params;
            const { NomeSala, Funcao } = req.body;
            const salaExistente = await SalaModel.findByPk(IdSala);
            if (!salaExistente) {
                return res.status(404).json({
                    error: 'Sala não foi encontrada!'
                });
            }
            await salaExistente.update({
                NomeSala,
                Funcao,
            });
            return res.status(200).json(salaExistente);
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    };

    // Criar Sala
    async CreateSala  (req, res) {
        try {
            const { NomeSala, Funcao, TipoSala, NumeroSala, Capacidade, Criador } = req.body;
            const NovaSala = await SalaModel.create({
                NomeSala, 
                Funcao, 
                TipoSala, 
                NumeroSala, 
                Capacidade, 
                Criador 
            });
            return res.status(201).json(NovaSala);
        } catch (error) {
            return res.status(500).json({
                error: `Erro interno! ${error}`
            });
        }
    }
}

module.exports = new SalaController ();