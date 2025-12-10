import { useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Cadastro() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
        // Envia para o backend (role padrão será 'client' definido no backend)
        await api.post('/auth/register', formData);
        alert('Conta criada com sucesso! Faça login para continuar.');
        router.push('/login');
    } catch (err) {
        setError(err.response?.data?.error || 'Erro ao criar conta.');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/d54727b4-2ad9-4e71-a48b-4476a5470084/e71569d5-d083-4375-a45b-9d413b561c20/BR-pt-20230206-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black/60"></div>
      <Navbar />
      
      <div className="z-10 bg-black/75 p-12 md:p-16 rounded-lg w-full max-w-md backdrop-blur-sm animate-fadeIn">
        <h2 className="text-3xl font-bold mb-8 text-white">Criar Conta</h2>
        
        {error && <div className="bg-red-900/50 text-red-200 p-3 rounded mb-4 text-sm border border-red-800">{error}</div>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
                <input 
                    type="text" 
                    placeholder="Seu Nome" 
                    className="w-full p-4 rounded bg-[#333] text-white border-none focus:ring-2 focus:ring-red-600 outline-none placeholder-gray-400" 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required 
                />
            </div>
            <div>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full p-4 rounded bg-[#333] text-white border-none focus:ring-2 focus:ring-red-600 outline-none placeholder-gray-400" 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required 
                />
            </div>
            <div>
                <input 
                    type="password" 
                    placeholder="Senha" 
                    className="w-full p-4 rounded bg-[#333] text-white border-none focus:ring-2 focus:ring-red-600 outline-none placeholder-gray-400" 
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    required 
                />
            </div>

            <button type="submit" className="bg-red-600 py-4 rounded font-bold text-white hover:bg-red-700 transition mt-4 text-lg">
                Cadastrar
            </button>
        </form>

        <div className="mt-6 text-gray-400 text-sm">
            Já tem uma conta? <Link href="/login" className="text-white hover:underline cursor-pointer">Conecte-se agora.</Link>
        </div>
      </div>
    </div>
  );
}