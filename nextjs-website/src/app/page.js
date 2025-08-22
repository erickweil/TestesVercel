'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // Estado para armazenar a lista de postagens
  const [postagens, setPostagens] = useState([]);
  // Estado para os campos do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  // Estado para feedback de carregamento e erros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar as postagens da API
  const fetchPostagens = async () => {
    try {
      const response = await fetch("https://testes-vercel-api.vercel.app/postagens");
      if (!response.ok) {
        throw new Error("Erro ao carregar postagens");
      }
      const json = await response.json();
      setPostagens(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    fetchPostagens();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    const novaPostagem = { titulo, descricao };

    try {
      const response = await fetch("https://testes-vercel-api.vercel.app/postagens", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaPostagem),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar a postagem');
      }

      // Limpa os campos do formulário
      setTitulo('');
      setDescricao('');
      
      // Atualiza a lista de postagens para mostrar a nova
      fetchPostagens(); 

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-slate-400 min-h-screen flex flex-row justify-center font-sans">
      <div className="bg-slate-100 max-w-4xl w-full grow p-6 md:p-10">
        
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Criar Nova Postagem:</h2>
          
          {/* Formulário agora controlado pelo estado do React */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="titulo" className="block text-lg font-medium text-gray-700">Título</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Digite o título da postagem"
                required
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-lg font-medium text-gray-700">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Digite a descrição da postagem"
                rows="4"
                required
              />
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
              Criar Postagem
            </button>
          </form>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Postagens:</h2>
          
          {/* Exibe mensagens de carregamento ou erro */}
          {loading && <p>Carregando postagens...</p>}
          {error && <p className="text-red-500">Erro: {error}</p>}

          <div className="space-y-4">
            {/* Mapeia e exibe as postagens do estado */}
            {!loading && !error && postagens.map((postagem) => (
              <div key={postagem._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900">{postagem.titulo}</h3>
                <p className="text-gray-600 mt-2">{postagem.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}