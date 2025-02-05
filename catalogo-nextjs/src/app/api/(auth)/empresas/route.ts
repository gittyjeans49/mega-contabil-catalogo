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
        return new NextResponse("Error in fetching companies" + error.message, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const empresa = new Empresa(body);
        await empresa.save();

        return new NextResponse(JSON.stringify({ message: "Company was created.", empresa: empresa })),
            ({ status: 200 });

    } catch (error: any) {
        return new NextResponse("Error in creating company" + error.message, { status: 500 });
    }

};

export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { empresaId, newEmpresa } = body;
        await connect();

        if (!empresaId || !newEmpresa) {
            return new NextResponse(
                JSON.stringify({ message: "ID or new company not found." }), { status: 400 });
        }

        if (!Types.ObjectId.isValid(empresaId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid company ID." }), { status: 400, });
        }

        const updatedEmpresa = await Empresa.findOneAndUpdate(
            { _id: new ObjectId(empresaId) },
            { empresa: newEmpresa },
            { new: true }
        );

        if (!updatedEmpresa) {
            return new NextResponse(
                JSON.stringify({ message: "Company not found in the database." }), { status: 400 });
        }

        return new NextResponse(JSON.stringify({ message: "Company is updated,", empresa: updatedEmpresa }), { status: 200 })

    } catch (error: any) {
        return new NextResponse("Error in updating company" + error.message, { status: 500 });
    }
}

export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const empresaId: any = searchParams.get("empresaId");

        if (!empresaId) {
            return new NextResponse(JSON.stringify({ message: "ID not found." }), { status: 400 });
        }

        if (!Types.ObjectId.isValid(empresaId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid company ID." }), { status: 400 });
        }

        await connect();

        const deletedEmpresa = await Empresa.findByIdAndDelete(
            new Types.ObjectId(empresaId)
        );

        if (!deletedEmpresa) {
            new NextResponse(JSON.stringify({ message: "Company not found in the database. " }), { status: 400 })
        }

        return new NextResponse(JSON.stringify({ message: "Company is deleted. ", empresa: deletedEmpresa }), { status: 200 })

    } catch (error: any) {
        return new NextResponse("Error in deleting company" + error.message, { status: 500 });
    }
}