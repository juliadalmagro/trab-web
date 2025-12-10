const db = require('../models');

module.exports = {
    // Listar (Público)
    async getAll(req, res) {
        // Se for admin, pode ver tudo? Por enquanto, manteremos a regra de só ver não alugados
        // Mas para edição, o admin poderia querer ver todos. 
        // Vamos manter simples: Admin vê o catálogo disponível para editar.
        const movies = await db.Movie.findAll({ 
            where: { isRented: false },
            order: [['createdAt', 'DESC']] // Mais recentes primeiro
        });
        res.json(movies);
    },

    // Criar (Admin)
    async create(req, res) {
        try {
            const movie = await db.Movie.create(req.body);
            res.status(201).json(movie);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    // Atualizar (Admin) - NOVO
    async update(req, res) {
        try {
            const { id } = req.params;
            await db.Movie.update(req.body, { where: { id } });
            const updated = await db.Movie.findByPk(id);
            res.json(updated);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    // Deletar (Admin) - NOVO
    async delete(req, res) {
        try {
            const { id } = req.params;
            await db.Movie.destroy({ where: { id } });
            res.json({ message: 'Filme removido com sucesso.' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
};