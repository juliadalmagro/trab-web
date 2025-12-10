module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
        role: { type: DataTypes.ENUM('admin', 'client'), defaultValue: 'client' }
    });
};