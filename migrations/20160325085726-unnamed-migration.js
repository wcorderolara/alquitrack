'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    // return queryInterface.dropAllTables()
    //https://github.com/sequelize/sequelize/issues/966

	queryInterface.addColumn(
		'precioEquipo', 
		'PaiId',
		{
        	type: Sequelize.INTEGER,
        	references: "Pais",
        	referencesKey: "id"
    	}
    );
  },

  down: function (queryInterface, Sequelize) {
    // return queryInterface.dropAllTables()
  }
};
