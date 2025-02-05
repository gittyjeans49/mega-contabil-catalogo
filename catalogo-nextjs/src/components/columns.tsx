"use client";

import { ObjectId } from "mongoose";

export type User = {
    _id: ObjectId
    empresa: string
    codigo: number
    tipo_lucro: string
    equipe: number
    responsavel: string
    fechamento: string
}

export const columns = [
    {
        key: "empresa",
        label: "Nome da Empresa",
        sortable: "true"
    },
    {
        key: "codigo",
        label: "Código",
    },
    {
        key: "tipo_lucro",
        label: "Tipo de Lucro",
    },
    {
        key: "equipe",
        label: "Equipe",
    },
    {
        key: "responsavel",
        label: "Responsável",
    },
    {
        key: "fechamento",
        label: "Fechamento",
    }
];