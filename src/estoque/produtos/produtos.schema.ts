import mongoose, { Schema } from 'mongoose';

const produtosSchema = new Schema({
    "ID": {type: Number, required: true},
    "nome": {type: String, required: true},
    "quantidade": {type: Number, required: true}
},{
    timestamps: true
});

export default mongoose.model('produtos', produtosSchema)