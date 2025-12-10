require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/models');
const movieRoutes = require('./src/routes/movieRoutes');
const authRoutes = require('./src/routes/authRoutes');
const rentalRoutes = require('./src/routes/rentalRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Middlewares
app.use((req, res, next) => { console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`); next(); });

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rentals', rentalRoutes);

app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: err.message }); });

const PORT = 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Backend Pro rodando na porta ${PORT}`));
});