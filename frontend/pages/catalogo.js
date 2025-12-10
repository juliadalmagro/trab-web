import { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import AdminMovieForm from '../components/AdminMovieForm';
import { useRouter } from 'next/router';

export default function Catalogo() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para saber se é admin
  
  // Estado para o Modal de Edição/Criação
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const router = useRouter();

  useEffect(() => {
    loadMovies();
    // Verifica se usuário é admin
    const userStr = localStorage.getItem('user');
    if(userStr) {
        const user = JSON.parse(userStr);
        if(user.role === 'admin') setIsAdmin(true);
    }
  }, []);

  const loadMovies = () => {
    api.get('/movies').then(res => setMovies(res.data)).catch(console.error);
  };

  const handleRent = async (movie) => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        alert('Faça login para alugar!');
        return router.push('/login');
    }
    const user = JSON.parse(userStr);

    try {
        await api.post('/rentals', { userId: user.id, movieId: movie.id });
        alert(`Sucesso! Você alugou: ${movie.title}`);
        setSelectedMovie(null);
        loadMovies();
    } catch (err) {
        alert('Erro ao alugar.');
    }
  };

  // --- FUNÇÕES DE ADMIN ---

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Evita abrir o modal de detalhes
    if(!confirm('Tem certeza que deseja excluir este filme?')) return;
    try {
        await api.delete(`/movies/${id}`);
        loadMovies();
    } catch(err) { alert('Erro ao excluir'); }
  };

  const handleEdit = (e, movie) => {
    e.stopPropagation();
    setEditingMovie(movie);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingMovie(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
        if (editingMovie) {
            await api.put(`/movies/${editingMovie.id}`, formData);
            alert('Filme atualizado!');
        } else {
            await api.post('/movies', formData);
            alert('Filme criado!');
        }
        setIsFormOpen(false);
        loadMovies();
    } catch (err) {
        alert('Erro ao salvar: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black pb-20">
      <Navbar />
      
      <div className="pt-32 pb-10 px-6 md:px-12 bg-gradient-to-b from-black/80 to-netflix-black flex justify-between items-end">
        <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Catálogo</h2>
            <p className="text-gray-400 text-lg">Gerencie e alugue os melhores títulos.</p>
        </div>
        
        {/* Botão de Adicionar (Só Admin) */}
        {isAdmin && (
            <button onClick={handleCreate} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition hover:scale-105">
                <span className="text-2xl leading-none pb-1">+</span> Adicionar Filme
            </button>
        )}
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <div 
                key={movie.id} 
                className="group relative bg-[#181818] rounded-md overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-red-900/20"
                onClick={() => setSelectedMovie(movie)}
            >
              <div className="aspect-[2/3] w-full relative">
                <img src={movie.imageUrl} alt={movie.title} className="w-full h-full object-cover" />
                
                {/* AÇÕES DE ADMIN (Overlay) */}
                {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2 z-20">
                        <button onClick={(e) => handleEdit(e, movie)} className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 text-white shadow-lg" title="Editar">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button onClick={(e) => handleDelete(e, movie.id)} className="bg-red-600 p-2 rounded-full hover:bg-red-700 text-white shadow-lg" title="Excluir">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center pointer-events-none">
                    <span className="bg-white/20 backdrop-blur border border-white/50 text-white px-4 py-2 rounded-full font-bold text-sm">Ver Detalhes</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-white truncate text-sm md:text-base">{movie.title}</h3>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                    <span>{movie.genre}</span>
                    <span className="border border-gray-600 px-1 rounded">{movie.classification}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modais */}
      <Modal 
        isOpen={!!selectedMovie} 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        onRent={handleRent}
      />

      <AdminMovieForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        movieToEdit={editingMovie}
      />
    </div>
  );
}