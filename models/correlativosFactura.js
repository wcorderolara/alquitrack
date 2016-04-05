
module.exports = function(sequelize, DataTypes){

	var correlativosFactura = sequelize.define('correlativosFactura',{
		serie: {
			type: DataTypes.STRING,
			allowNull: false
		},
		cantidadDisponibles: {
			type: DataTypes.BIGINT(11),
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		resolucion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		cantidadConsumidas: {
			type: DataTypes.BIGINT(11),
			allowNull: true,
			defaultValue: 0
		},
		cantidadAprobadas:{//son las Facturas Disponibles doh!
			type: DataTypes.BIGINT(11),
			allowNull: true
		}
	},{
		classMethods:{
			associate: function(models){
				correlativosFactura.belongsTo(models.Pais, {foreignKey: {allowNull: true}})
			}
		},
		freezeTableName: true,
		tableName: 'correlativosFactura'
	});

	return correlativosFactura;
}