"use client"

import EditarEmpresa from "../components/EditarEmpresa";
import OpcoesAvancadas from "../components/OpcoesAvancadas";
import Header from "../components/Header";
import Tabela from "../components/Tabela";
import styles from "../styles/main.module.css";
import { Modal, Button, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { User } from "@/components/columns";

// adicionar import do mockdata https://675772e7c0a427baf94cc80f.mockapi.io/tabelaempresa

// async function getUsers(): Promise<User[]>{
//   const res = await fetch(
//     'https://675772e7c0a427baf94cc80f.mockapi.io/tabelaempresa'
//   )
//   const userData = await res.json()
//   return userData
// }

function tableData(){
  
  useEffect(() => {
    async function fetchData(): Promise<User[]> {
      const res = await fetch('https://675772e7c0a427baf94cc80f.mockapi.io/tabelaempresa');
      const data = await res.json();
      return data;
    }
    fetchData();
  }, [])
  // retornar os dados encontrados
}

export default function Home() {

  // const users = tableData();

  const editarEmpresa = useDisclosure();

  const opcoesAvancadas = useDisclosure();

  const year = new Date().getFullYear();

  return (
    <div>
      <Header />
      <h1>Fechamento Contábil {year}</h1>
      <h3>Empresas - Contabilidade Megasult</h3>

      <div className={styles.searchFunctions}>
        <input
          className="empresaInput"
          type="text"
          placeholder="Digite o nome da empresa..."
        />
        <button type="button">Pesquisar empresa...</button>

        <Button disableRipple={true} onPress={editarEmpresa.onOpen}>Editar empresa...</Button>

        <Button disableRipple={true} onPress={opcoesAvancadas.onOpen}>Mais opções...</Button>

        <Modal hideCloseButton={true} isOpen={editarEmpresa.isOpen} onOpenChange={editarEmpresa.onOpenChange}>
          <EditarEmpresa />
        </Modal>

        <Modal hideCloseButton={true} isOpen={opcoesAvancadas.isOpen} onOpenChange={opcoesAvancadas.onOpenChange}>
          <OpcoesAvancadas />
        </Modal>

      </div>
      {/* users está passando como void */}
      {/* <Tabela users={users} /> */}
      <Tabela />
    </div>
  );
}
