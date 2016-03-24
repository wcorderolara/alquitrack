
module.exports = function(sequelize, DataTypes){
	var Modulo = sequelize.define('Modulo', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethos: {
			associate: function(models){
				Modulo.belongsToMany(models.Pagina, {through: models.paginaModulo, foreignKey:'moduloId'});
				Modulo.belongsToMany(models.Rol, {through: models.moduloRol, foreignKey:'moduloId'});
			}
		},
		freezeTableName: true,
		tableName: 'modulo'
	});

	return Modulo;
}