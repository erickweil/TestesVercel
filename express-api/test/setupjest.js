import "dotenv/config";
import { MongoMemoryServer } from "mongodb-memory-server";
import { conectarBanco, desconetarBanco } from "../src/config/dbConnect.js"; // precisa importar, configurar zod e callbacks ctrl+c

// https://jestjs.io/docs/configuration#globalsetup-string
export default async function setupJest(globalConfig, projectConfig) {
	// This will create an new instance of "MongoMemoryServer" and automatically start it
	const mongod = await MongoMemoryServer.create();
    // https://pt.stackoverflow.com/questions/495629/o-que-%C3%A9-o-globalthis-no-javascript
	// Set reference to mongod in order to close the server during teardown.
	globalThis.__MONGOD__ = mongod;

	process.env.DB_URL = mongod.getUri();
	//console.log("Iniciado banco, DB_URL: ", process.env.DB_URL);

    await conectarBanco();

    console.log("MongoDB Memory Server iniciado");
    console.log("Executando seed essencial...");

    await desconetarBanco();
}
