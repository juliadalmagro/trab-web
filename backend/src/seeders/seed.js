const db = require('../models');
const bcrypt = require('bcryptjs');

const seed = async () => {
    try {
        await db.sequelize.sync({ force: true });

        // FILMES REAIS COM IMAGENS BOAS
        const movies = [
            { 
                title: 'Harry Potter e a Pedra Filosofal', 
                genre: 'Fantasia', 
                duration: '2h 32m',
                classification: 'L',
                synopsis: 'Harry Potter é um garoto órfão que vive infeliz com seus tios. Em seu aniversário de 11 anos, ele descobre que é um bruxo e entra para a escola de Hogwarts.',
                imageUrl: 'https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg' 
            },
            { 
                title: 'O Senhor dos Anéis: A Sociedade do Anel', 
                genre: 'Aventura', 
                duration: '2h 58m',
                classification: '12',
                synopsis: 'Um manso hobbit do Condado e oito companheiros partem em uma jornada para destruir o poderoso Um Anel e salvar a Terra-média das trevas de Sauron.',
                imageUrl: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg' 
            },
            { 
                title: 'Star Wars: Uma Nova Esperança', 
                genre: 'Sci-Fi', 
                duration: '2h 01m',
                classification: 'L',
                synopsis: 'Luke Skywalker une forças com um cavaleiro Jedi, um piloto arrogante, um Wookiee e dois droides para salvar a galáxia da estação de batalha do Império.',
                imageUrl: 'https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg' 
            },
            { 
                title: 'Batman: O Cavaleiro das Trevas', 
                genre: 'Ação', 
                duration: '2h 32m',
                classification: '14',
                synopsis: 'Quando a ameaça conhecida como Coringa causa estragos e caos no povo de Gotham, Batman deve aceitar um dos maiores testes psicológicos e físicos de sua capacidade de lutar contra a injustiça.',
                imageUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' 
            },
            { 
                title: 'Interestelar', 
                genre: 'Sci-Fi', 
                duration: '2h 49m',
                classification: '10',
                synopsis: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.',
                imageUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' 
            },
             { 
                title: 'Vingadores: Ultimato', 
                genre: 'Ação', 
                duration: '3h 01m',
                classification: '12',
                synopsis: 'Após os eventos devastadores de Guerra Infinita, o universo está em ruínas. Com a ajuda dos aliados remanescentes, os Vingadores se reúnem mais uma vez para reverter as ações de Thanos.',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/9/9b/Avengers_Endgame.jpg' 
            }
        ];
        
        await db.Movie.bulkCreate(movies);

        // USUÁRIOS
        const pass = await bcrypt.hash('123456', 8);
        await db.User.create({ name: 'Admin Supremo', email: 'admin@cine.com', password: pass, role: 'admin' });
        await db.User.create({ name: 'João Cliente', email: 'cliente@cine.com', password: pass, role: 'client' });

        console.log('✅ SEED EXECUTADO COM SUCESSO!');
        process.exit();
    } catch (e) { console.error(e); process.exit(1); }
};
seed();