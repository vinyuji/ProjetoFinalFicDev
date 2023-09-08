const { DataTypes, Model } = require('sequelize');
const Sequelize = require('../database/index');

class UserModel extends Model {
  static init(database) {
    super.init(
      {
        Cpf: {
          type: DataTypes.TEXT,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        Nome: DataTypes.TEXT,
        Cep: DataTypes.TEXT,
        Senha: DataTypes.TEXT,
        Email: DataTypes.TEXT,
        FormacaoAcademica: DataTypes.TEXT,
        TempoDeCurso: DataTypes.TEXT,
        Especializacao: DataTypes.TEXT,
      },
      {
        timestamps: true,
        sequelize: database,
        tableName: 'User',
        modelName: 'user',
      })
  }
  static associate(models){
    this.hasMany(models.reserva, { foreignKey: 'IdReserva' });
  }
}

module.exports = { UserModel };
