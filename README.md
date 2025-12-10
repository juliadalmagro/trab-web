## Credenciais
- **Admin:** admin@cine.com / 123456
- **Cliente:** cliente@cine.com / 123456


## Necessário
- É necessário que o docker esteja instalado para conseguir rodar o projeto

## Como Rodar
1. `docker compose down -v` (Caso já tenha rodado antes)
2. `docker compose up -d`
3. Backend: `cd backend` -> `npm install` -> `npm run seed` -> `npm run dev`
4. Frontend: `cd frontend` -> `npm install` -> `npm run dev`