import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { defaultSchemaOptions } from "../config/dbConnect.js";

const PostagemSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        default: null
    }    
},{
    ...defaultSchemaOptions,
    ...{ 
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } 
    }
});

PostagemSchema.plugin(paginate);
const Postagem = mongoose.model("postagem", PostagemSchema);

export default Postagem;
