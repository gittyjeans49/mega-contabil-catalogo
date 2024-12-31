"use client"

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@nextui-org/react";
import styles from "../styles/main.module.css";
import { columns } from "./columns";

const rows = [
    {
        key: "1",
        empresa: "Empresa 1",
        codigo: "0001",
        tipo_lucro: "Lucro Real",
        equipe: "Equipe 1",
        responsavel: "Fulano",
        fechamento: "Mês 08/202X",
    },
    {
        key: "2",
        empresa: "Empresa 2",
        codigo: "0002",
        tipo_lucro: "Lucro Presumido",
        equipe: "Equipe 2",
        responsavel: "Ciclano",
        fechamento: "Mês 09/202X",
    },
    {
        key: "3",
        empresa: "Empresa 3",
        codigo: "0003",
        tipo_lucro: "Lucro Real",
        equipe: "Equipe 3",
        responsavel: "Beltrano",
        fechamento: "Mês 10/202X",
    },
];

export default function Tabela() {
    return (
        <Table className={styles.tabelaEmpresa}>
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            {/* ternary conditional for text alignment */}
            <TableBody items={rows} emptyContent="Nenhuma empresa encontrada." style={ TableBody === null ? {textAlign:"center"} : {textAlign:"left"} }>
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
