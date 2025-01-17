"use client"
import React, { useMemo, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
    SortDescriptor,
    Input,
    Button,
    Modal,
    useDisclosure,
} from "@heroui/react";
import styles from "../styles/main.module.css"
import { columns, User } from "./columns";
import { FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiCircleRemove, CiSearch } from "react-icons/ci";
import EditarEmpresa from "./EditarEmpresa";
import OpcoesAvancadas from "./OpcoesAvancadas";

export default function Tabela({ users }: { users: User[] }) {
    const [filterValue, setFilterValue] = useState('');
    const hasSearchFilter = Boolean(filterValue);

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "key",
        direction: "ascending"
    });

    const sortedItems = React.useMemo(() => {
        return [...users].sort((a: User, b: User) => {
            const first = a[sortDescriptor.column as keyof User] as number;
            const second = b[sortDescriptor.column as keyof User] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, users]);

    // const chevronDirection = sortDescriptor.direction === "descending" ? <FaChevronDown /> : <FaChevronUp />

    const filteredItems = useMemo(() => {
        let filteredUsers = [...sortedItems]

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter(user =>
                user.empresa.toLowerCase().includes(filterValue.toLowerCase())
            )
        }

        return filteredUsers
    }, [sortedItems, filterValue, hasSearchFilter])

    const rowsPerPage = 15;
    const [page, setPage] = React.useState(1);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const editarEmpresa = useDisclosure();

    const opcoesAvancadas = useDisclosure();

    const bottomContent = React.useMemo(() => {
        return (
            <div className={styles.divpage}>
                <Pagination className={styles.tablepage}
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
            </div>
        )
    }, [items.length, page, pages]);

    return (
        <div>
            <div className={styles.searchFunctions}>

                <Input
                    className={styles.topContInput}
                    isClearable
                    placeholder="Digite o nome da empresa..."
                    startContent={<CiSearch />}
                    endContent={<CiCircleRemove />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />

                <Button className="menuButton" disableRipple={true} onPress={editarEmpresa.onOpen}>Editar empresa...</Button>

                <Button className="menuButton" disableRipple={true} onPress={opcoesAvancadas.onOpen}>Mais opções...</Button>

                <Modal hideCloseButton={true} isOpen={editarEmpresa.isOpen} onOpenChange={editarEmpresa.onOpenChange}>
                    <EditarEmpresa />
                </Modal>

                <Modal hideCloseButton={true} isOpen={opcoesAvancadas.isOpen} onOpenChange={opcoesAvancadas.onOpenChange}>
                    <OpcoesAvancadas />
                </Modal>

            </div>

            <div>

                <Table
                    bottomContent={bottomContent}
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}>
                    {/* mudar a direção do chevron quando a coluna muda a ordem da classificação */}
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}
                            {...(['codigo', 'empresa'].includes(column.key) ? { allowsSorting: true } : {})}
                        >{column.label}</TableColumn>}
                    </TableHeader>
                    {/* condicional ternário para alinhar o texto */}
                    <TableBody items={items} emptyContent="Nenhuma empresa encontrada." style={items.length === 0 ? { textAlign: "center" } : { textAlign: "left" }} >
                        {(item) =>
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
