const Sala = require('../model/SalaModel');

//Create Salas
async function createSala(req, res) {
  try {
    const newSala = await Sala.create(req.body);
    res.status(201).json(newSala);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar sala' });
  }
}

//Listar Salas
async function getSalas(req, res) {
  try {
    const salas = await Sala.findAll();
    res.status(200).json(salas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter salas' });
  }
}

//Atualizar Salas
async function updateSala(req, res) {
  const { IdSala } = req.params;
  try {
    const [updatedRows] = await Sala.update(req.body, {
      where: { IdSala },
    });
    if (updatedRows === 0) {
      res.status(404).json({ error: 'Sala não encontrada' });
    } else {
      res.status(200).json({ message: 'Sala atualizada com sucesso' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar sala' });
  }
}

//Deletar Salas
async function deleteSala(req, res) {
  const { IdSala } = req.params;
  try {
    const deletedRows = await Sala.destroy({
      where: { IdSala },
    });
    if (deletedRows === 0) {
      res.status(404).json({ error: 'Sala não encontrada' });
    } else {
      res.status(200).json({ message: 'Sala excluída com sucesso' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir sala' });
  }
}

module.exports = { createSala, getSalas, updateSala, deleteSala };
