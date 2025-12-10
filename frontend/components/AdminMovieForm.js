import { useState, useEffect } from 'react';

export default function AdminMovieForm({ isOpen, onClose, onSubmit, movieToEdit }) {
    const [form, setForm] = useState({ 
        title: '', genre: '', duration: '', classification: 'L', imageUrl: '', synopsis: '' 
    });

    useEffect(() => {
        if (movieToEdit) {
            setForm(movieToEdit);
        } else {
            setForm({ title: '', genre: '', duration: '', classification: 'L', imageUrl: '', synopsis: '' });
        }
    }, [movieToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[#181818] w-full max-w-2xl rounded-xl shadow-2xl p-8 animate-fadeIn border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {movieToEdit ? 'Editar Filme' : 'Adicionar Novo Filme'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="Título" className="bg-[#333] text-white p-3 rounded outline-none focus:ring-2 focus:ring-red-600" 
                            value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                        
                        <input required placeholder="Gênero (ex: Ação)" className="bg-[#333] text-white p-3 rounded outline-none focus:ring-2 focus:ring-red-600" 
                            value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="Duração (ex: 2h 10m)" className="bg-[#333] text-white p-3 rounded outline-none focus:ring-2 focus:ring-red-600" 
                            value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
                        
                        <select className="bg-[#333] text-white p-3 rounded outline-none focus:ring-2 focus:ring-red-600"
                            value={form.classification} onChange={e => setForm({...form, classification: e.target.value})}>
                            <option value="L">Livre (L)</option>
                            <option value="10">10 Anos</option>
                            <option value="12">12 Anos</option>
                            <option value="14">14 Anos</option>
                            <option value="16">16 Anos</option>
                            <option value="18">18 Anos</option>
                        </select>
                    </div>

                    <input required placeholder="URL da Imagem (Capa)" className="w-full bg-[#333] text-white p-3 rounded outline-none focus:ring-2 focus:ring-red-600" 
                        value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />

                    <textarea required placeholder="Sinopse" rows="4" className="w-full bg-[#333] text-white p-3 rounded outline-none focus:ring-2 focus:ring-red-600" 
                        value={form.synopsis} onChange={e => setForm({...form, synopsis: e.target.value})}></textarea>

                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                        <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition">
                            {movieToEdit ? 'Salvar Alterações' : 'Criar Filme'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}