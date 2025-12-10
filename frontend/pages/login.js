import { useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('user', JSON.stringify(res.data));
        router.push('/catalogo');
    } catch (err) { 
        setError('Email ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/d54727b4-2ad9-4e71-a48b-4476a5470084/e71569d5-d083-4375-a45b-9d413b561c20/BR-pt-20230206-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black/60"></div>
      <Navbar />
      <div className="z-10 bg-black/75 p-16 rounded-lg w-full max-w-md backdrop-blur-sm animate-fadeIn">
        <h2 className="text-3xl font-bold mb-8 text-white">Entrar</h2>
        
        {error && <div className="bg-orange-600/20 text-orange-200 p-3 rounded mb-4 text-sm border border-orange-800">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="p-4 rounded bg-[#333] text-white border-none focus:ring-2 focus:ring-red-600 outline-none" value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" className="p-4 rounded bg-[#333] text-white border-none focus:ring-2 focus:ring-red-600 outline-none" value={password} onChange={e=>setPassword(e.target.value)} />
            <button type="submit" className="bg-red-600 py-4 rounded font-bold text-white hover:bg-red-700 transition mt-6 text-lg">Entrar</button>
        </form>

        <div className="mt-6 text-gray-400">
            Novo por aqui? <Link href="/cadastro" className="text-white hover:underline cursor-pointer">Cadastre-se agora.</Link>
        </div>
      </div>
    </div>
  );
}