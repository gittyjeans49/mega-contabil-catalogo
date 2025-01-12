"use client";

export type User = {
    empresa: string
    codigo: number
    tipo_lucro: string
    equipe: number
    responsavel: string
    fechamento: string
    key: string
}

export const columns = [
    {
        key: "empresa",
        label: "Nome da Empresa",
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