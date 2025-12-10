module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Rental", {
        rentalDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        returnDate: { type: DataTypes.DATE } // Pode ser null se ainda não devolveu
    });
};