import "dotenv/config";
import app from "./src/app.ts";

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