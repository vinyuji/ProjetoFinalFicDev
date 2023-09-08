const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index'); 


class SalaModel extends Model {
  static init(database){
    super.init({
      IdSala: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
        NomeSala: DataTypes.TEXT,
        Funcao: DataTypes.TEXT,
        TipoSala: DataTypes.TEXT,
        NumeroSala: DataTypes.TEXT,
        Capacidade: DataTypes.INTEGER,
      },{
        timestamps: true,
        sequelize: database,
        tableName: 'Sala',
        modelName: 'sala',
      })
    }
    static associate(models){
      this.belongsTo(models.reserva, { foreignKey: 'IdReserva' });
    }
}



module.exports = { SalaModel };

