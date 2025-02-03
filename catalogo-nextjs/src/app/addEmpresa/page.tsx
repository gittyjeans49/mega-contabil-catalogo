"use client"

import React from "react";
import styles from "../../styles/addEmp.module.css";
import Header from "../../components/Header";
import { Button } from "@heroui/react";

export default function AddEmpresa() {
    return (
        <>
            <Header />
            <h1>Adicionar Empresa</h1>
            <div className={styles.divForm}>
                <form className={styles.formBox}>
                    <div className={styles.gray}>
                        <label className={styles.label} htmlFor="nome">Nome da Empresa:</label>
                        <input type="text" id="nome" name="nome" className="empresaInput" />
                        <label className={`${styles.label} ${styles.space}`} htmlFor="codigo">
                            Código da Empresa:
                        </label>
                        <input
                            type="number"
                            id="codigo"
                            name="codigo"
                            className="empresaInput"
                            min={0}
                        />
                        <br />
                    </div>
                    <div className={styles.gray}>
                        <span className={styles.span}>Equipe:</span>
                        <select className="selectBox">
                            <option value={0}>Equipe 1</option>
                            <option value={1}>Equipe 2</option>
                            <option value={2}>Equipe 3</option>
                            <option value={3}>Equipe 4</option>
                            <option value={4}>Equipe 5</option>
                            <option value={5}>Equipe 6</option>
                            <option value={6}>Equipe 7</option>
                            <option value={7}>Equipe 8</option>
                            <option value={8}>Equipe 9</option>
                        </select>
                        <span className={`${styles.span} ${styles.space}`}>Tipo de lucro:</span>
                        <input
                            type="radio"
                            className={styles.smallMargin}
                            id="real"
                            name="lucro"
                            defaultValue="real"
                        />
                        <label className={styles.label} htmlFor="real">Real</label>
                        <input
                            type="radio"
                            className={styles.smallMargin}
                            id="presumido"
                            name="lucro"
                            defaultValue="presumido"
                        />
                        <label className={styles.label} htmlFor="presumido">Presumido</label> <br />
                    </div>
                    <span className={styles.span}>Fechamento contábil a partir do mês:</span>
                    <select className="selectBox">
                        <option value={0}>01/202X</option>
                        <option value={1}>02/202X</option>
                        <option value={2}>03/202X</option>
                        <option value={3}>04/202X</option>
                        <option value={4}>05/202X</option>
                        <option value={5}>06/202X</option>
                        <option value={6}>07/202X</option>
                        <option value={7}>08/202X</option>
                        <option value={8}>09/202X</option>
                        <option value={9}>10/202X</option>
                        <option value={10}>11/202X</option>
                        <option value={11}>12/202X</option>
                    </select>
                    <br />
                    <Button className={`${styles.marginTop} menuButton`} type="submit">Adicionar Empresa</Button>
                </form>
            </div>
        </>
    )
}