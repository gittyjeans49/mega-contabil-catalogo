import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';

import logoMegasult from '../assets/mega-logo.png'

export default function Header() {
    return (
        <header className={styles.header}>
            <Link className={styles.headerMenu} href="/">
                Menu Principal
            </Link>
            <Link className={styles.headerMenu} href="/addEmpresa">
                Adicionar Empresa
            </Link>
            <Image src={logoMegasult} className={styles.logoMega} alt='Logo Megasult' width={100} height={100} />
        </header>

    );
}