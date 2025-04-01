import connect from "@/lib/db";
import Empresa from "@/lib/models/empresa";
import { Types } from "mongoose";
import { NextResponse } from "next/server"

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
    try {
        await connect();
        const empresas = await Empresa.find();
        return new NextResponse(JSON.stringify(empresas), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Erro ao buscar empresas" + error.message, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const { empresa, codigo, tipo_lucro, equipe, responsavel, fechamento } = await request.json();
        await connect();
        const newEmpresa = new Empresa({
            empresa, codigo, tipo_lucro, equipe, responsavel, fechamento
        });
        await newEmpresa.save();

        return new NextResponse(JSON.stringify({ message: "Empresa foi criada.", empresa: newEmpresa }), { status: 200 });

    } catch (error: any) {
        return new NextResponse("Erro ao criar empresa" + error.message, { status: 500 });
    }
};

export const PUT = async (request: Request) => {

    try {
        const { searchParams } = new URL(request.url);
        const empresaId: any = searchParams.get("empresaId");
        const { empresa, codigo, tipo_lucro, equipe, responsavel, fechamento } = await request.json();
        await connect();

        if (!empresaId) {
            return new NextResponse(
                JSON.stringify({ message: "ID da empresa não encontrada." }), { status: 400 });
        }

        if (!Types.ObjectId.isValid(empresaId)) {
            return new NextResponse(JSON.stringify({ message: "ID da empresa inválido." }), { status: 400 });
        }

        const updatedEmpresa = await Empresa.findByIdAndUpdate(
            { _id: new ObjectId(empresaId) },
            {"empresa": empresa, "codigo": codigo, "tipo_lucro": tipo_lucro, "equipe": equipe, "responsavel": responsavel, "fechamento": fechamento},
            { new: true }

        );

        if (!updatedEmpresa) {
            return new NextResponse(
                JSON.stringify({ message: "Empresa não encontrada no banco de dados." }), { status: 400 });
        }

        return new NextResponse(JSON.stringify({ message: "Empresa foi atualizada,", empresa: updatedEmpresa }), { status: 200 })

    } catch (error: any) {
        return new NextResponse("Erro ao atualizar empresa" + error.message, { status: 500 });
    }
}

export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const empresaId: any = searchParams.get("empresaId");

        if (!empresaId) {
            return new NextResponse(JSON.stringify({ message: "ID não encontrado." }), { status: 400 });
        }

        if (!Types.ObjectId.isValid(empresaId)) {
            return new NextResponse(JSON.stringify({ message: "ID de empresa inválido." }), { status: 400 });
        }

        await connect();

        const deletedEmpresa = await Empresa.findByIdAndDelete(
            new Types.ObjectId(empresaId)
        );

        if (!deletedEmpresa) {
            new NextResponse(JSON.stringify({ message: "Empresa não encontrada no banco de dados. " }), { status: 400 })
        }

        return new NextResponse(JSON.stringify({ message: "Empresa foi deletada. ", empresa: deletedEmpresa }), { status: 200 })

    } catch (error: any) {
        return new NextResponse("Erro ao deletar empresa" + error.message, { status: 500 });
    }
}