const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const hash = await bcrypt.hash(password, 8);
            await db.User.create({ name, email, password: hash, role: role || 'client' });
            res.status(201).json({ message: 'Criado!' });
        } catch(e) { res.status(400).json({ error: e.message }); }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await db.User.findOne({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))) 
                return res.status(401).json({ error: 'Credenciais inválidas' });
            
            const token = jwt.sign({ id: user.id, role: user.role }, 'SECRET', { expiresIn: '24h' });
            res.json({ id: user.id, name: user.name, role: user.role, accessToken: token });
        } catch(e) { res.status(500).json({ error: e.message }); }
    }
};