const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index'); 


class UserModel extends Model {
  static init(database){
    super.init({
      Cpf: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
        Nome: DataTypes.TEXT,
        Cep: DataTypes.TEXT,
        Senha: DataTypes.TEXT,
        Email: DataTypes.TEXT,
        FormacaoAcademica: DataTypes.INTEGER,
        TempoDeCurso: DataTypes.TEXT,
        Especializacao: DataTypes.TEXT,
      },{
        timestamps: true,
        sequelize: database,
        tableName: 'User',
        modelName: 'user',
      })
    }
    static associate(models){
      this.belongsTo(models.Reserva, { foreignKey: 'IdReserva' });
    }
}



module.exports = { UserModel };
