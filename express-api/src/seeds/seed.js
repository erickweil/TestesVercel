import "dotenv/config";
import { conectarBanco, desconetarBanco } from "../config/dbConnect.js";
import Postagem from "../models/Postagem.js";

try {
    await conectarBanco();

    await Postagem.deleteMany({});

    for(let i = 0; i < 10; i++) {
        await Postagem.create({
            titulo: `Postagem ${i}`,
            descricao: "Apenas para testes"
        });
    }
    console.log("Inserido postagens!");

} finally {
    await desconetarBanco();
}
