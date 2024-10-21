import "dotenv/config";
import app from "../src/app.js";

// https://vercel.com/guides/using-express-with-vercel


//const port = process.env.PORT || 3000;
app.listen(() => {
	console.log("Servidor iniciado às "+new Date().toISOString());
});

export default app;