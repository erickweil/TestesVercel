export default async function Home() {

   // Substitua a URL pela rota da API que retorna as postagens
   const response = await fetch("https://testes-vercel-api.vercel.app/postagens"); // URL da API
   const json = await response.json();

   if (!response.ok) {
     throw new Error(json.message || "Erro ao carregar postagens");
   }

   const postagens = json.data;

  return (
    <div className="bg-slate-400 h-screen flex flex-row justify-center">
      <div className="bg-slate-100 max-w-4xl grow p-10">
        
      <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Criar Nova Postagem:</h2>
          
          <form action="https://testes-vercel-api.vercel.app/postagens" method="POST" className="space-y-4">
            <div>
              <label htmlFor="titulo" className="block text-lg font-medium">Título</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Digite o título da postagem"
                required
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-lg font-medium">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Digite a descrição da postagem"
                required
              />
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
              Criar Postagem
            </button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Postagens:</h2>
          <div className="space-y-4">
            {postagens.map((postagem) => (
              <div key={postagem._id} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold">{postagem.titulo}</h3>
                <p>{postagem.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}