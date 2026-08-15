import "dotenv/config";

// Use "type: module" in package.json to use ES modules
import express from 'express';
import cors from 'cors';
import { db } from './db.ts';

const app = express();

app.use(cors());


const startTime = new Date();

// Define your routes
app.get('/', (req, res) => {
    res.status(200).send(`FUNCIONOU`);
});

app.get("/info", (req, res) => {
    res.status(200).json({
        startTime: startTime.toISOString()
    });
});

app.get("/contador", async (req, res) => {
    // Listar todas as tabelas do banco
    let linhas = await db.execute(`SELECT * FROM public.contador LIMIT 1`);

    res.status(200).json(linhas[0]);
});

app.post("/contador", async (req, res) => {
    // Incrementar o contador
    const linhas = await db.execute(`UPDATE public.contador SET count = count + 1 WHERE id = 1 RETURNING *`);

    res.status(200).json(linhas[0]);
});
 

if (!process.env.VERCEL) {
    const port = 3000;
    app.listen(port, (e) => {
        if(e) {
            console.error(`Error starting server:`, e);
            throw e;
        }
        console.log(`Example app listening on port ${port}`);
    });
}

export default app;