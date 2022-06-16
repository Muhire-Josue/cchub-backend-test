module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      extension: {
        type: Sequelize.STRING,
      },
      score_type_1: {
        type: Sequelize.INTEGER,
      },
      score_type_2: {
        type: Sequelize.INTEGER,
      },
      score_type_3: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('assets');
  },
};
