import Postagem from "../models/Postagem.js";

class PostagemController {
	static listarPostagens = async (req,res) => {
        const { pagina } = req.query;

        const postagensResult = await Postagem.paginate(
            {},
            {
                sort: { _id: -1 },
                page: pagina ? parseInt(pagina) : 1
            }
        );

        res.status(200).json(postagensResult);        
	};

    static realizarPostagem = async (req, res) => {
        const { titulo, descricao } = req.body;

        const criado = await Postagem.create({
            titulo: titulo,
            descricao: descricao
        });

        res.status(201).json(criado);        
    };
}

export default PostagemController;