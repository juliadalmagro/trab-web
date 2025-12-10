const db = require('../models');

module.exports = {
    // Alugar Filme
    async rentMovie(req, res) {
        const t = await db.sequelize.transaction();
        try {
            const { userId, movieId } = req.body;
            
            // 1. Marca filme como alugado
            await db.Movie.update({ isRented: true }, { where: { id: movieId }, transaction: t });
            
            // 2. Cria registro de aluguel
            await db.Rental.create({ userId, movieId }, { transaction: t });

            await t.commit();
            res.json({ message: 'Filme alugado com sucesso!' });
        } catch (error) {
            await t.rollback();
            res.status(500).json({ error: error.message });
        }
    },

    // Devolver Filme (NOVO)
    async returnMovie(req, res) {
        const t = await db.sequelize.transaction();
        try {
            const { rentalId } = req.body;
            const rental = await db.Rental.findByPk(rentalId);
            
            if(!rental) return res.status(404).json({ error: 'Aluguel não encontrado' });

            // 1. Marca a data de devolução no aluguel
            await rental.update({ returnDate: new Date() }, { transaction: t });

            // 2. Libera o filme no catálogo (isRented = false)
            await db.Movie.update({ isRented: false }, { where: { id: rental.movieId }, transaction: t });

            await t.commit();
            res.json({ message: 'Filme devolvido com sucesso!' });
        } catch (error) {
            await t.rollback();
            res.status(500).json({ error: error.message });
        }
    },

    // Listar APENAS alugueis ativos (sem data de devolução)
    async getMyRentals(req, res) {
        try {
            const { userId } = req.query;
            const rentals = await db.Rental.findAll({
                where: { 
                    userId,
                    returnDate: null // <--- Só traz o que não foi devolvido
                },
                include: [{ model: db.Movie }]
            });
            res.json(rentals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};