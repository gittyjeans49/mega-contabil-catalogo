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
import { CiCircleRemove, CiSearch } from "react-icons/ci";
import EditarEmpresa from "./EditarEmpresa";

export default function Tabela({ users }: { users: User[] }) {

    const [empresaSelecionada, setEmpresaSelecionada] = useState<any>(null);

    // filtro do nome da empresa
    const [filterEmpresa, setFilterEmpresa] = useState('');
    const hasSearchFilter = Boolean(filterEmpresa);

    // filtro do código da empresa
    const [filterCode, setFilterCode] = useState('');
    const hasSearchFilter2 = Boolean(filterCode);

    // filtro do código da equipe
    const [filterTeam, setFilterTeam] = useState('');
    const hasSearchFilter3 = Boolean(filterTeam);

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "_id",
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

    const filteredItems = useMemo(() => {
        let filteredUsers = [...sortedItems]

        // if input do nome da empresa
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter(user =>
                user.empresa.toLowerCase().includes(filterEmpresa.toLowerCase())
            )
        }

        // if input do código da empresa
        if (hasSearchFilter2) {
            filteredUsers = filteredUsers.filter(user =>
                user.codigo.toString().includes(filterCode.toString())
            )
        }

        if (hasSearchFilter3) {
            filteredUsers = filteredUsers.filter(user =>
                user.equipe.toString().includes(filterTeam.toString())
            )
        }

        return filteredUsers
    }, [sortedItems, filterEmpresa, filterCode, filterTeam, hasSearchFilter, hasSearchFilter2, hasSearchFilter3])


    const rowsPerPage = 15;
    const [page, setPage] = React.useState(1);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    //filtro empresa
    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterEmpresa(value);
            setPage(1);
        } else {
            setFilterEmpresa("");
        }
    }, []);
    //limpar empresa
    const onClear = React.useCallback(() => {
        setFilterEmpresa("");
        setPage(1);
    }, []);
    //filtro código
    const onSearchChange2 = React.useCallback((value?: string) => {
        if (value) {
            setFilterCode(value);
            setPage(1);
        } else {
            setFilterCode("");
        }
    }, []);
    //limpar código
    const onClear2 = React.useCallback(() => {
        setFilterCode("");
        setPage(1);
    }, []);
    //filtro equipe
    const onSearchChange3 = React.useCallback((value?: string) => {
        if (value) {
            setFilterTeam(value);
            setPage(1);
        } else {
            setFilterTeam("");
        }
    }, []);
    //limpar equipe
    const onClear3 = React.useCallback(() => {
        setFilterTeam("");
        setPage(1);
    }, []);

    const editarEmpresa = useDisclosure();

    const bottomContent = React.useMemo(() => {
        return (
            <div className={styles.divpage}>
                <Pagination className={styles.tablepage}
                    page={page}
                    total={pages}
                    showControls
                    onChange={(page) => setPage(page)}
                />
            </div>
        )
    }, [items.length, page, pages]);

    return (
        <div>
            <div className={styles.searchFunctions}>

                <span className={styles.inputSpan}>Nome:</span>
                <Input
                    className={styles.topContInput}
                    isClearable
                    placeholder="Digite o nome da empresa"
                    startContent={<CiSearch />}
                    endContent={<CiCircleRemove />}
                    value={filterEmpresa}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />

                <span className={styles.inputSpan}>Código:</span>
                <Input
                    className={styles.topContInput}
                    isClearable
                    placeholder="Digite o código da empresa"
                    startContent={<CiSearch />}
                    endContent={<CiCircleRemove />}
                    value={filterCode}
                    onClear={() => onClear2()}
                    onValueChange={onSearchChange2}
                />

                <span className={styles.inputSpan}>Equipe:</span>
                <Input
                    className={styles.topContInput}
                    isClearable
                    placeholder="Digite a equipe"
                    startContent={<CiSearch />}
                    endContent={<CiCircleRemove />}
                    value={filterTeam}
                    onClear={() => onClear3()}
                    onValueChange={onSearchChange3}
                />

                <Modal hideCloseButton={true} isOpen={editarEmpresa.isOpen} onOpenChange={editarEmpresa.onOpenChange}>
                    <EditarEmpresa dadosEmpresa={empresaSelecionada} />
                </Modal>

            </div>

            <div>
                <Table
                    bottomContent={bottomContent}
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}
                            {...(['codigo', 'empresa', 'equipe'].includes(column.key) ? { allowsSorting: true } : {})}
                        >{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={items} emptyContent="Nenhuma empresa encontrada." style={items.length === 0 ? { textAlign: "center" } : { textAlign: "left" }} >
                        {(item) =>
                            <TableRow key={item._id.toString()}>
                            {(columnKey) => (
                              <>
                                {columnKey !== "botao" ? (<TableCell>{getKeyValue(item, columnKey)}</TableCell>) : (
                                  <TableCell>
                                    <Button className="menuButton" disableRipple={true} onPress={() => {
                                        setEmpresaSelecionada(item);
                                        editarEmpresa.onOpen();
                                      }}>
                                      Editar...
                                    </Button>
                                  </TableCell>
                                )}
                              </>
                            )}
                          </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
