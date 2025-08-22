import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

export const defaultSchemaOptions = {
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // Dar erro se tentar salvar um documento com um campo que não está no schema
    strict: "throw"
};

const myCustomLabels = {
    totalDocs: "resultados",
    docs: "data",
    limit: "limite",
    page: "pagina",
    totalPages: "totalPaginas",
    pagingCounter: false,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: false,
    nextPage: false
};

paginate.paginate.options = {
    leanWithId: false,
    page: 1,
    limit: 10,
    customLabels: myCustomLabels
};

export async function conectarBanco() {
    const bancoUrl = process.env.MONGODB_URI;

    // Para ver todas as requisições feitas ao banco
    //mongoose.set("debug", true);

    if (mongoose.connection.readyState === 1) return; // já está conectado

    try {
        if(!bancoUrl) {
            throw new Error("Impossível se conectar ao banco de dados. \nÉ necessário configurar a variável de ambiente MONGODB_URI com a string de conexão do banco de dados.");
        }
        mongoose.set("strictQuery", true);

		if(process.env.DEBUGLOG === "true")
            console.log("Tentando conexão com banco...");

		mongoose.connection
			.on("open", () => {
				if(process.env.DEBUGLOG === "true") console.log("Conexão com banco estabelecida com sucesso!");
			})
			.on("error", err => {
				console.log("Erro no banco de dados:",err);
			})
			.on("disconnected", () => {
				if(process.env.DEBUGLOG === "true") console.log("Desconectou do banco de dados.");
			});

        // Timeout de 3 segundos na tentativa de conexão
		await mongoose.connect(bancoUrl, {
            serverSelectionTimeoutMS: 3000,
            socketTimeoutMS: 3000,
            connectTimeoutMS: 3000,
        });

    } catch (error) {
        console.error("Erro ao conectar com o banco de dados:", error);
        throw error; // Lançar erro caso não consiga conectar
    }
}

export async function desconetarBanco() {
    if (process.env.DEBUGLOG === "true") 
        console.log("Solicitando encerramento da conexão com banco");

    await mongoose.connection.close();
}