// Use "type: module" in package.json to use ES modules
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

 
const startTime = new Date();
let contador = 0;

// Define your routes
app.get('/', (req, res) => {
    res.status(200).send(`FUNCIONOU`);
});

app.get("/info", (req, res) => {
    res.status(200).json({
        contador: contador++,
        startTime: startTime.toISOString()
    });
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