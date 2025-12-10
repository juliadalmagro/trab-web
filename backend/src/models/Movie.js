module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Movie", {
        title: { type: DataTypes.STRING, allowNull: false },
        genre: { type: DataTypes.STRING },
        imageUrl: { type: DataTypes.STRING(500) }, 
        duration: { type: DataTypes.STRING }, // Ex: '2h 15m'
        classification: { type: DataTypes.STRING }, // Ex: '14', '18', 'L'
        synopsis: { type: DataTypes.TEXT },
        isRented: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
};