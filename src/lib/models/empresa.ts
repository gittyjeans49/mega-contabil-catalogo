import { Schema, model, models } from "mongoose";

const EmpresaSchema = new Schema(
    {
        empresa: {type: "string", required: true},
        codigo: {type: "number", required: true},
        tipo_lucro: {type: "string", required: true},
        equipe: {type: "number", required: true},
        responsavel: {type: "string", required: true},
        fechamento: {type: "string", required: true}
    },
    {
        timestamps: true
    }
)

const Empresa = models.Empresa || model("Empresa", EmpresaSchema);

export default Empresa;