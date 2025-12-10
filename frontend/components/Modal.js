export default function Modal({ isOpen, onClose, movie, onRent }) {
    if (!isOpen || !movie) return null;
    
    // Cor da classificação
    const getClassColor = (c) => {
        if(c === 'L') return 'bg-green-500';
        if(c === '10' || c === '12') return 'bg-yellow-500';
        if(c === '14' || c === '16') return 'bg-orange-500';
        return 'bg-red-600';
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[#181818] w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fadeIn">
                
                {/* Imagem Lateral */}
                <div className="md:w-1/3 h-64 md:h-auto relative">
                    <img src={movie.imageUrl} alt={movie.title} className="w-full h-full object-cover" />
                </div>

                {/* Conteúdo */}
                <div className="p-8 md:w-2/3 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-4xl font-bold text-white">{movie.title}</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                        </div>

                        <div className="flex items-center gap-4 mb-6 text-sm font-semibold">
                            <span className="text-green-400">98% Relevante</span>
                            <span className="text-gray-300">{movie.duration}</span>
                            <span className={`${getClassColor(movie.classification)} px-2 py-0.5 rounded text-black text-xs font-bold`}>{movie.classification}</span>
                            <span className="border border-gray-500 px-2 py-0.5 rounded text-xs text-gray-300 uppercase">{movie.genre}</span>
                        </div>

                        <p className="text-gray-300 leading-relaxed text-lg mb-8">{movie.synopsis}</p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => onRent(movie)} className="flex-1 bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" /></svg>
                            Alugar Agora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}