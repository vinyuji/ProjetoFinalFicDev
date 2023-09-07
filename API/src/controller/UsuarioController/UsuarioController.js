const User = require('../../model/UsuarioModel');

//Criar os usuários
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

//listar os usuários
async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter usuários' });
  }
}

//Atualizer usuário
async function updateUser(req, res) {
  const { Cpf } = req.params;
  try {
    const [updatedRows] = await User.update(req.body, {
      where: { Cpf },
    });
    if (updatedRows === 0) {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

//Deletar usuário
async function deleteUser(req, res) {
  const { Cpf } = req.params;
  try {
    const deletedRows = await User.destroy({
      where: { Cpf },
    });
    if (deletedRows === 0) {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
}

module.exports = { createUser, getUsers, updateUser, deleteUser };
