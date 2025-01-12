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
} from "@nextui-org/react";
import styles from "../styles/main.module.css"
import { columns, User } from "./columns";

const rows = [
    {
        "empresa": "Torphy and Sons",
        "codigo": 86806,
        "tipo_lucro": "payment",
        "equipe": 91,
        "responsavel": "Rogelio",
        "fechamento": "September",
        "key": "1"
    },
    {
        "empresa": "Mann, Runte and Parker",
        "codigo": 24620,
        "tipo_lucro": "payment",
        "equipe": 32,
        "responsavel": "Kaitlin",
        "fechamento": "December",
        "key": "2"
    },
    {
        "empresa": "Waters, Barton and McClure",
        "codigo": 21596,
        "tipo_lucro": "withdrawal",
        "equipe": 28,
        "responsavel": "Brenna",
        "fechamento": "April",
        "key": "3"
    },
    {
        "empresa": "Klocko - Langworth",
        "codigo": 51956,
        "tipo_lucro": "payment",
        "equipe": 25,
        "responsavel": "Eldridge",
        "fechamento": "March",
        "key": "4"
    },
    {
        "empresa": "Leffler, Olson and Marks",
        "codigo": 16184,
        "tipo_lucro": "deposit",
        "equipe": 14,
        "responsavel": "Jensen",
        "fechamento": "February",
        "key": "5"
    },
    {
        "empresa": "Schulist and Sons",
        "codigo": 45988,
        "tipo_lucro": "withdrawal",
        "equipe": 93,
        "responsavel": "Eleonore",
        "fechamento": "May",
        "key": "6"
    },
    {
        "empresa": "Harber - Dicki",
        "codigo": 79789,
        "tipo_lucro": "deposit",
        "equipe": 3,
        "responsavel": "Aleen",
        "fechamento": "December",
        "key": "7"
    },
    {
        "empresa": "Friesen Group",
        "codigo": 9425,
        "tipo_lucro": "invoice",
        "equipe": 96,
        "responsavel": "Jessica",
        "fechamento": "December",
        "key": "8"
    },
    {
        "empresa": "Macejkovic and Sons",
        "codigo": 24886,
        "tipo_lucro": "withdrawal",
        "equipe": 21,
        "responsavel": "Abigayle",
        "fechamento": "February",
        "key": "9"
    },
    {
        "empresa": "Buckridge, Pfeffer and Hagenes",
        "codigo": 90779,
        "tipo_lucro": "payment",
        "equipe": 38,
        "responsavel": "Hobart",
        "fechamento": "July",
        "key": "10"
    },
    {
        "empresa": "Schmeler, Hirthe and Gerlach",
        "codigo": 82919,
        "tipo_lucro": "deposit",
        "equipe": 91,
        "responsavel": "Hassan",
        "fechamento": "October",
        "key": "11"
    },
    {
        "empresa": "Sanford, Zulauf and Gutkowski",
        "codigo": 92473,
        "tipo_lucro": "withdrawal",
        "equipe": 48,
        "responsavel": "Ara",
        "fechamento": "August",
        "key": "12"
    },
    {
        "empresa": "Rosenbaum - Kunze",
        "codigo": 46070,
        "tipo_lucro": "invoice",
        "equipe": 50,
        "responsavel": "Reuben",
        "fechamento": "October",
        "key": "13"
    },
    {
        "empresa": "Hills - Heaney",
        "codigo": 68375,
        "tipo_lucro": "payment",
        "equipe": 53,
        "responsavel": "Glenna",
        "fechamento": "April",
        "key": "14"
    },
    {
        "empresa": "Muller - Hodkiewicz",
        "codigo": 37219,
        "tipo_lucro": "withdrawal",
        "equipe": 61,
        "responsavel": "Mohammad",
        "fechamento": "November",
        "key": "15"
    },
    {
        "empresa": "Lemke Group",
        "codigo": 44894,
        "tipo_lucro": "deposit",
        "equipe": 23,
        "responsavel": "Wayne",
        "fechamento": "July",
        "key": "16"
    },
    {
        "empresa": "Fritsch Inc",
        "codigo": 55465,
        "tipo_lucro": "invoice",
        "equipe": 62,
        "responsavel": "Aliya",
        "fechamento": "June",
        "key": "17"
    },
    {
        "empresa": "Jacobi - Fay",
        "codigo": 58672,
        "tipo_lucro": "payment",
        "equipe": 13,
        "responsavel": "Ansley",
        "fechamento": "February",
        "key": "18"
    },
    {
        "empresa": "Quitzon, McClure and Ruecker",
        "codigo": 1112,
        "tipo_lucro": "deposit",
        "equipe": 31,
        "responsavel": "Edmund",
        "fechamento": "March",
        "key": "19"
    },
    {
        "empresa": "Boyer, Johns and Murphy",
        "codigo": 90624,
        "tipo_lucro": "payment",
        "equipe": 58,
        "responsavel": "Austen",
        "fechamento": "March",
        "key": "20"
    },
    {
        "empresa": "Kozey Group",
        "codigo": 9153,
        "tipo_lucro": "invoice",
        "equipe": 78,
        "responsavel": "Joan",
        "fechamento": "January",
        "key": "21"
    },
    {
        "empresa": "Hills - Reilly",
        "codigo": 86283,
        "tipo_lucro": "withdrawal",
        "equipe": 36,
        "responsavel": "Leonard",
        "fechamento": "March",
        "key": "22"
    },
    {
        "empresa": "Gulgowski Inc",
        "codigo": 16684,
        "tipo_lucro": "payment",
        "equipe": 97,
        "responsavel": "Julian",
        "fechamento": "July",
        "key": "23"
    },
    {
        "empresa": "Marks, Haley and Collins",
        "codigo": 23829,
        "tipo_lucro": "payment",
        "equipe": 53,
        "responsavel": "Mozelle",
        "fechamento": "February",
        "key": "24"
    },
    {
        "empresa": "Cronin - Brekke",
        "codigo": 1017,
        "tipo_lucro": "deposit",
        "equipe": 99,
        "responsavel": "Henry",
        "fechamento": "January",
        "key": "25"
    },
    {
        "empresa": "Koch, Tremblay and Stracke",
        "codigo": 58230,
        "tipo_lucro": "deposit",
        "equipe": 30,
        "responsavel": "Tyshawn",
        "fechamento": "May",
        "key": "26"
    },
    {
        "empresa": "Harris LLC",
        "codigo": 43141,
        "tipo_lucro": "withdrawal",
        "equipe": 58,
        "responsavel": "Jonathon",
        "fechamento": "September",
        "key": "27"
    },
    {
        "empresa": "Koss - Konopelski",
        "codigo": 4001,
        "tipo_lucro": "invoice",
        "equipe": 7,
        "responsavel": "Brenna",
        "fechamento": "January",
        "key": "28"
    },
    {
        "empresa": "Stracke, O'Reilly and Schamberger",
        "codigo": 33410,
        "tipo_lucro": "payment",
        "equipe": 37,
        "responsavel": "Rebekah",
        "fechamento": "May",
        "key": "29"
    },
    {
        "empresa": "Homenick, Mitchell and Stiedemann",
        "codigo": 13318,
        "tipo_lucro": "deposit",
        "equipe": 66,
        "responsavel": "Rhiannon",
        "fechamento": "August",
        "key": "30"
    },
    {
        "empresa": "Hermiston, Luettgen and Spinka",
        "codigo": 16300,
        "tipo_lucro": "deposit",
        "equipe": 43,
        "responsavel": "Frances",
        "fechamento": "August",
        "key": "31"
    },
    {
        "empresa": "Bode - Buckridge",
        "codigo": 51519,
        "tipo_lucro": "payment",
        "equipe": 61,
        "responsavel": "Fleta",
        "fechamento": "November",
        "key": "32"
    },
    {
        "empresa": "Rowe - Mosciski",
        "codigo": 10182,
        "tipo_lucro": "payment",
        "equipe": 44,
        "responsavel": "Claud",
        "fechamento": "September",
        "key": "33"
    },
    {
        "empresa": "Gutmann - Streich",
        "codigo": 60988,
        "tipo_lucro": "payment",
        "equipe": 6,
        "responsavel": "Rosalia",
        "fechamento": "May",
        "key": "34"
    },
    {
        "empresa": "Schimmel - Reichel",
        "codigo": 42783,
        "tipo_lucro": "deposit",
        "equipe": 24,
        "responsavel": "Buford",
        "fechamento": "January",
        "key": "35"
    },
    {
        "empresa": "Morar, Mueller and Hamill",
        "codigo": 34972,
        "tipo_lucro": "invoice",
        "equipe": 56,
        "responsavel": "Carli",
        "fechamento": "June",
        "key": "36"
    },
    {
        "empresa": "Klein - Cremin",
        "codigo": 91023,
        "tipo_lucro": "deposit",
        "equipe": 1,
        "responsavel": "Shad",
        "fechamento": "January",
        "key": "37"
    },
    {
        "empresa": "Pfeffer, Hermann and Batz",
        "codigo": 47669,
        "tipo_lucro": "invoice",
        "equipe": 87,
        "responsavel": "Anderson",
        "fechamento": "December",
        "key": "38"
    },
    {
        "empresa": "Cronin, Prohaska and Botsford",
        "codigo": 10581,
        "tipo_lucro": "invoice",
        "equipe": 4,
        "responsavel": "Heloise",
        "fechamento": "May",
        "key": "39"
    },
    {
        "empresa": "Gerhold Group",
        "codigo": 79786,
        "tipo_lucro": "payment",
        "equipe": 42,
        "responsavel": "Thomas",
        "fechamento": "December",
        "key": "40"
    },
    {
        "empresa": "Shields LLC",
        "codigo": 64966,
        "tipo_lucro": "withdrawal",
        "equipe": 68,
        "responsavel": "Magdalena",
        "fechamento": "December",
        "key": "41"
    },
    {
        "empresa": "Hermann, Funk and Ward",
        "codigo": 22874,
        "tipo_lucro": "invoice",
        "equipe": 59,
        "responsavel": "Judah",
        "fechamento": "October",
        "key": "42"
    },
    {
        "empresa": "Feest, Botsford and Ratke",
        "codigo": 69132,
        "tipo_lucro": "withdrawal",
        "equipe": 27,
        "responsavel": "Jon",
        "fechamento": "October",
        "key": "43"
    },
    {
        "empresa": "Luettgen LLC",
        "codigo": 50778,
        "tipo_lucro": "payment",
        "equipe": 50,
        "responsavel": "Ali",
        "fechamento": "July",
        "key": "44"
    },
    {
        "empresa": "Abernathy - Schoen",
        "codigo": 58585,
        "tipo_lucro": "invoice",
        "equipe": 91,
        "responsavel": "Vida",
        "fechamento": "October",
        "key": "45"
    },
    {
        "empresa": "Osinski - Kulas",
        "codigo": 93546,
        "tipo_lucro": "payment",
        "equipe": 57,
        "responsavel": "Alexander",
        "fechamento": "March",
        "key": "46"
    },
    {
        "empresa": "Howell, Abernathy and Bernier",
        "codigo": 46644,
        "tipo_lucro": "payment",
        "equipe": 91,
        "responsavel": "Dannie",
        "fechamento": "October",
        "key": "47"
    },
    {
        "empresa": "Paucek Group",
        "codigo": 40249,
        "tipo_lucro": "invoice",
        "equipe": 96,
        "responsavel": "Queenie",
        "fechamento": "October",
        "key": "48"
    },
    {
        "empresa": "Franecki, Price and Konopelski",
        "codigo": 30462,
        "tipo_lucro": "invoice",
        "equipe": 92,
        "responsavel": "Anabel",
        "fechamento": "June",
        "key": "49"
    },
    {
        "empresa": "Medhurst - Kertzmann",
        "codigo": 28534,
        "tipo_lucro": "invoice",
        "equipe": 29,
        "responsavel": "Brown",
        "fechamento": "September",
        "key": "50"
    }
];

// Tabela({ users }: { users: User[] })
export default function Tabela() {
    const [filterValue, setFilterValue] = useState('');
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...rows]

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter(user =>
                user.empresa.toLowerCase()
            )
        }

        return filteredUsers
    }, [rows, filterValue, hasSearchFilter])

    const rowsPerPage = 15;
    const [page, setPage] = React.useState(1);
    const pages = Math.ceil(rows.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return rows.slice(start, end);
    }, [page, rows]);

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "empresa",
        direction: "ascending",
    });

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: User, b: User) => {
            const first = a[sortDescriptor.column as keyof User] as number;
            const second = b[sortDescriptor.column as keyof User] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

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

    const topContent = React.useMemo(() => {
        return (
            <div>
                <div>
                    <Input className={styles.EmpresaInput}
                        isClearable
                        placeholder="Digite o nome da empresa..."
                        // startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        hasSearchFilter,
        onClear
    ]);

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
        <Table
            // topContent={topContent}
            bottomContent={bottomContent}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}>
            {/* adicionar filtros e classificações - em progresso */}
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}
                    {...(column.key === 'empresa' ? { allowsSorting: true } : {})}
                >{column.label}</TableColumn>}
            </TableHeader>
            {/* condicional ternário para alinhar o texto */}
            <TableBody items={items} emptyContent="Nenhuma empresa encontrada." style={TableBody.length == null ? { textAlign: "center" } : { textAlign: "left" }} >
                {(item) =>
                    <TableRow key={item.key}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                }
            </TableBody>
        </Table>
    );
}
