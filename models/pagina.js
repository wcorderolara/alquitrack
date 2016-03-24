
module.exports = function(sequelize, DataTypes){
	var Pagina = sequelize.define('Pagina', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		link: {
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
				belongsToMany(models.Modulo, {through: model.paginaModulo, foreignKey: 'paginaId'});
			}
		},
		freezeTableName: true,
		tableName: 'pagina'
	});

	return Pagina;
}