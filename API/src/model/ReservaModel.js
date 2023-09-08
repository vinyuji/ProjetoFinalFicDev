const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index'); 


class ReservaModel extends Model {
  static init(database){
    super.init({
      IdReserva: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
        Sala: DataTypes.TEXT,
        FuncaoSala: DataTypes.TEXT,
        NumeroSala: DataTypes.TEXT,
        DataReserva: DataTypes.DATE,
        Capacidade: DataTypes.INTEGER,
        PessoaReservista: DataTypes.TEXT,
        Status: DataTypes.TEXT,
        Cpf: DataTypes.TEXT,
        IdSala: DataTypes.UUID,
      },{
        timestamps: true,
        sequelize: database,
        tableName: 'Reserva',
        modelName: 'reserva',
      })
    }
    static associate(models){
      this.belongsTo(models.user, { foreignKey: 'Cpf'});
      this.belongsTo(models.sala, { foreignKey: 'IdSala'});
    }
}



module.exports = { ReservaModel };
