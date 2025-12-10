import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Carrega usuário apenas no cliente para evitar erro de hidratação
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => { localStorage.clear(); window.location.href = '/login'; };

  return (
    // ADICIONEI 'top-0' AQUI EMBAIXO 👇
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold text-netflix-red tracking-tighter cursor-pointer">LOCA<span className="text-white">FILM</span></h1>        </Link>
        
        <div className="flex items-center gap-6 font-medium text-sm">
            <Link href="/catalogo" className="hover:text-netflix-gray transition text-white">CATÁLOGO</Link>
            {user && (
                <Link href="/meus-alugueis" className="hover:text-netflix-gray transition text-white">MEUS FILMES</Link>
            )}
            
            {user ? (
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-white text-xs opacity-70">Olá,</p>
                        <p className="text-sm font-bold text-white">{user.name}</p>
                    </div>
                    <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition">Sair</button>
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link href="/cadastro" className="text-white hover:text-gray-300 py-2 transition">Cadastrar</Link>
                    <Link href="/login" className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded text-white transition font-bold">ENTRAR</Link>
                </div>
            )}
        </div>
      </div>
    </nav>
  );
}