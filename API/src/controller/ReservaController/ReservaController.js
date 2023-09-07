const Reserva = require('../../model/ReservaModel');

//Criar reserva
async function createReserva(req, res) {
  try {
    const newReserva = await Reserva.create(req.body);
    res.status(201).json(newReserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar reserva' });
  }
}

//Listar reserva
async function getReservas(req, res) {
  try {
    const reservas = await Reserva.findAll();
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter reservas' });
  }
}

//Atualizar reserva
async function updateReserva(req, res) {
  const { IdReserva } = req.params;
  try {
    const [updatedRows] = await Reserva.update(req.body, {
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

//Deletar reserva
async function deleteReserva(req, res) {
  const { IdReserva } = req.params;
  try {
    const deletedRows = await Reserva.destroy({
      where: { IdReserva },
    });
    if (deletedRows === 0) {
      res.status(404).json({ error: 'Reserva não encontrada' });
    } else {
      res.status(200).json({ message: 'Reserva excluída com sucesso' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir reserva' });
  }
}

module.exports = { createReserva, getReservas, updateReserva, deleteReserva };
