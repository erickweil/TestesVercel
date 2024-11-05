import Postagem from "../models/Postagem.js";

class PostagemController {
	static listarPostagens = async (req,res) => {
        try {
            const { pagina } = req.query;

            const postagensResult = await Postagem.paginate(
                {},
                {
                    sort: { _id: -1 },
                    page: pagina ? parseInt(pagina) : 1
                }
            );

            res.status(200).json(postagensResult);
        } catch(e) {
            console.error(e);

            res.status(500).json({error: e});
        }
	};

    static realizarPostagem = async (req, res) => {
        try {
            const { titulo, descricao } = req.body;

            const criado = await Postagem.create({
                titulo: titulo,
                descricao: descricao
            });

            res.status(201).json(criado);
        } catch(e) {
            console.error(e);

            res.status(500).json({error: e});
        }
    }

}

export default PostagemController;