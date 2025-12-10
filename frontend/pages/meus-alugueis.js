import { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export default function MeusAlugueis() {
  const [rentals, setRentals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return router.push('/login');
    const user = JSON.parse(userStr);

    api.get(`/rentals/my?userId=${user.id}`)
       .then(res => setRentals(res.data))
       .catch(console.error);
  };

  const handleReturn = async (rentalId, movieTitle) => {
    if(!confirm(`Deseja realmente devolver "${movieTitle}"?`)) return;

    try {
        await api.put('/rentals/return', { rentalId });
        alert('Filme devolvido com sucesso!');
        // Remove o filme da lista visualmente na hora
        setRentals(rentals.filter(item => item.id !== rentalId));
    } catch (err) {
        alert('Erro ao devolver o filme.');
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black pb-20">
      <Navbar />
      <div className="pt-32 px-6 md:px-12 container mx-auto">
        <h2 className="text-4xl font-bold mb-8 border-l-4 border-red-600 pl-4">Minha Biblioteca</h2>
        
        <div className="space-y-4">
            {rentals.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row bg-[#181818] rounded-lg overflow-hidden hover:bg-[#222] transition p-4 gap-6 items-center shadow-md border border-gray-800">
                    <img src={item.Movie.imageUrl} className="w-24 h-36 object-cover rounded shadow-lg" />
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">{item.Movie.title}</h3>
                        <p className="text-gray-400 mb-4 text-sm line-clamp-2">{item.Movie.synopsis}</p>
                        <div className="flex justify-center md:justify-start gap-4 text-sm">
                            <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded border border-green-800 font-bold">● Alugado</span>
                            <span className="text-gray-500 py-1">Data: {new Date(item.rentalDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div>
                        <button 
                            onClick={() => handleReturn(item.id, item.Movie.title)}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition shadow-lg w-full md:w-auto flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                            Devolver
                        </button>
                    </div>
                </div>
            ))}

            {rentals.length === 0 && (
                <div className="text-center py-20 bg-[#181818] rounded-xl border border-gray-800">
                    <p className="text-xl text-gray-500">Você não tem filmes alugados no momento.</p>
                    <button onClick={() => router.push('/catalogo')} className="mt-4 text-red-500 hover:underline">Ir para o Catálogo</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}