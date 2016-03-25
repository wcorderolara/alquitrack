
module.exports = function(sequelize, DataTypes){
	
	var Tractor = sequelize.define('Tractor',{
		nombre:{
			type: DataTypes.STRING,
			allowNull: false
		},
		descripcion: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		marca: {
			type: DataTypes.STRING,
			allowNull:false
		},
		modelo: {
			type: DataTypes.STRING,
			allowNull: false
		},
		anio: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fechaCompra: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		imagen: {
			type: DataTypes.TEXT,
			allowNull: true
		},
	},{
		classMethods: {
			associate: function(models){
				Tractor.belongsTo(models.tipoEquipo, {foreignKey: {allowNull: false}});
				Tractor.belongsTo(models.estadoEquipo, {foreignKey: {allowNull: false}});
				Tractor.belongsTo(models.Pais, {foreignKey: {allowNull: false}});
				Tractor.belongsTo(models.Sede, {foreignKey: {allowNull:false}});

				Tractor.hasMany(models.reservaDetalle);
				Tractor.hasMany(models.bitacoraTractor);
				Tractor.hasMany(models.tallerTractor);
				Tractor.hasMany(models.facturaDetalle);

			}
		},
		freezeTableName: true,
		tableName: 'tractor'

	});

	return Tractor;
}