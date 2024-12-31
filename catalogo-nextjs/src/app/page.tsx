"use client"

import EditarEmpresa from "../components/EditarEmpresa";
import OpcoesAvancadas from "../components/OpcoesAvancadas";
import Header from "../components/Header";
import Tabela from "../components/Tabela";
import styles from "../styles/main.module.css";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";



export default function Home() {

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

        <Button onPress={editarEmpresa.onOpen}>Editar empresa...</Button>

        <Button onPress={opcoesAvancadas.onOpen}>Mais opções...</Button>

        <Modal hideCloseButton={true} isOpen={editarEmpresa.isOpen} onOpenChange={editarEmpresa.onOpenChange}>
          <EditarEmpresa />
        </Modal>

        <Modal hideCloseButton={true} isOpen={opcoesAvancadas.isOpen} onOpenChange={opcoesAvancadas.onOpenChange}>
          <OpcoesAvancadas />
        </Modal>

      </div>
      <Tabela />
    </div>
  );
}
