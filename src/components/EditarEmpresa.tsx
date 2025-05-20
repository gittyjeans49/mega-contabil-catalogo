import React, { useEffect, useState } from "react";
import styles from "../styles/main.module.css"
import { ModalContent, ModalBody } from "@heroui/react";
import { NextResponse } from "next/server";

interface EditarEmpresaProps {
    dadosEmpresa: {
        _id: string;
        empresa: string;
        codigo: string;
        tipo_lucro: string;
        equipe: string;
        responsavel: string;
        fechamento: string;
    };
}

export default function EditarEmpresa({ dadosEmpresa }: EditarEmpresaProps) {
    const [id, setId] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [codigo, setCodigo] = useState("");
    const [tipo_lucro, setTipo_lucro] = useState("");
    const [equipe, setEquipe] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [fechamento, setFechamento] = useState("");

    useEffect(() => {
        console.log("Dados empresa", dadosEmpresa);
        setId(dadosEmpresa._id);
        setEmpresa(dadosEmpresa.empresa);
        setCodigo(dadosEmpresa.codigo);
        setTipo_lucro(dadosEmpresa.tipo_lucro);
        setEquipe(dadosEmpresa.equipe);
        setResponsavel(dadosEmpresa.responsavel);
        setFechamento(dadosEmpresa.fechamento);
    }, [dadosEmpresa]);

    const handleUpdate = async (e: any) => {
        e.preventDefault()

        try {

            let res = await fetch("../api/empresas/?empresaId=" + id, {
                cache: 'no-store',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ empresa, codigo, tipo_lucro, equipe, responsavel, fechamento })
            })

            res = await res.json()

            console.log(res)

            window.location.reload();

            return new NextResponse(JSON.stringify({ message: "Empresa foi atualizada.", res: res })), ({ status: 200 });

        } catch (err: any) {
            return new NextResponse("Erro ao atualizar empresa" + err.message, { status: 500 });
        }
    }

    const handleDelete = async (e: any) => {
        e.preventDefault()

        try {

            let res = await fetch("../api/empresas/?empresaId=" + id, {
                cache: 'no-store',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            res = await res.json()

            console.log(res)

            window.location.reload();

            return new NextResponse(JSON.stringify({ message: "Empresa foi deletada.", res: res })), ({ status: 200 });


        } catch (err: any) {
            return new NextResponse("Erro ao deletar empresa" + err.message, { status: 500 });
        }
    }

    return (
        <ModalContent>
            {(onClose) => (
                <div className={styles.popup} onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        onClose();
                    }
                }}>
                    <ModalBody className={styles.popupContent}>
                        <h3>Editar Empresa</h3>
                        <br />
                        <form onSubmit={handleUpdate} action={"/"} className={styles.formBox} autoComplete="off">
                            {/* div da esquerda */}
                            <div className={styles.divLeft}>
                                <label className={styles.label} htmlFor="empresa">
                                    Nome da Empresa:
                                </label>
                                <input type="text" id="empresa" name="empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} className={`${styles.editEmpInput} empresaInput`} required />

                                <br />

                                <label className={styles.label} htmlFor="tipoLucro">
                                    Tipo de lucro:
                                </label>
                                <select className={`${styles.editEmpInput} empresaInput`} name="tipoLucro" value={tipo_lucro} onChange={(e) => setTipo_lucro(e.target.value)}>
                                    <option> </option>
                                    <option value={"Real"}>Real</option>
                                    <option value={"Presumido"}>Presumido</option>
                                </select>

                                <br />

                                <label className={styles.label} htmlFor="responsavel">
                                    Responsável:
                                </label>
                                <input type="text" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} name="responsavel" className={`${styles.editEmpInput} empresaInput`} required />
                            </div>

                            {/* div da direita */}
                            <div className={styles.divRight}>
                                <label className={styles.label} htmlFor="codigo">
                                    Código da Empresa:
                                </label>
                                <input type="number" id="codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} className={`${styles.editEmpInput} empresaInput`} min={0} required />

                                <br />

                                <label className={styles.label} htmlFor="equipe">
                                    Equipe:
                                </label>
                                <select className={`${styles.editEmpInput} empresaInput`} name="equipe" value={equipe} onChange={(e) => setEquipe(e.target.value)} required>
                                    <option> </option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                </select>

                                <br />

                                <label className={styles.label} htmlFor="fechamento">
                                    Fechamento ref. mês:
                                </label>
                                <select value={fechamento} onChange={(e) => setFechamento(e.target.value)} name="fechamento" className={`${styles.editEmpInput} empresaInput`} required>
                                    <option > </option>
                                    <option value={"Janeiro"}>Janeiro</option>
                                    <option value={"Fevereiro"}>Fevereiro</option>
                                    <option value={"Março"}>Março</option>
                                    <option value={"Abril"}>Abril</option>
                                    <option value={"Maio"}>Maio</option>
                                    <option value={"Junho"}>Junho</option>
                                    <option value={"Julho"}>Julho</option>
                                    <option value={"Agosto"}>Agosto</option>
                                    <option value={"Setembro"}>Setembro</option>
                                    <option value={"Outubro"}>Outubro</option>
                                    <option value={"Novembro"}>Novembro</option>
                                    <option value={"Dezembro"}>Dezembro</option>
                                </select>
                            </div>
                            <br />
                            <input className={`${styles.updDelButs} menuButton`} type="button" onClick={handleDelete} value="Deletar empresa" />
                            <input className={`${styles.updDelButs} menuButton`} type="submit" value="Salvar empresa" />
                        </form>
                    </ModalBody>
                </div>
            )}
        </ModalContent>
    )
}