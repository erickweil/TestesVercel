import { conectarBanco } from "../config/dbConnect.js";

export const middlewareConectarBanco = async (req, res, next) => {
    await conectarBanco();
    next();
};