import "dotenv/config";
import app from "./src/app.js";

// https://vercel.com/guides/using-express-with-vercel

let server;
const listenCallback = () => {
	const addr = server.address();
	console.log(`Servidor iniciado em ${addr.port} às ${new Date().toISOString()}`);
};

if(process.env.VERCEL) {
	server = app.listen(listenCallback);
} else {
	const port = process.env.PORT || 3001;
	server = app.listen(port, listenCallback);
}

export default app;