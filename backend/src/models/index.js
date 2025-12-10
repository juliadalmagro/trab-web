const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('movierental', 'admin', 'password', {
  host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./User')(sequelize, Sequelize);
db.Movie = require('./Movie')(sequelize, Sequelize);
db.Rental = require('./Rental')(sequelize, Sequelize);

// Associações
db.User.hasMany(db.Rental, { foreignKey: 'userId' });
db.Rental.belongsTo(db.User, { foreignKey: 'userId' });
db.Movie.hasMany(db.Rental, { foreignKey: 'movieId' });
db.Rental.belongsTo(db.Movie, { foreignKey: 'movieId' });

module.exports = db;