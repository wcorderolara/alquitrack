'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Factura',
      'tipoOperacionId',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'tipoOperacion',
          key: 'id'
        },
        allowNull: true
      }
    );
    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
