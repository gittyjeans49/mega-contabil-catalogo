import styles from "../styles/main.module.css"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


export default function EditarEmpresa() {

    return (
        <ModalContent>
            <div className={styles.popup}>
                <div className={styles.popupContent}>
                    <h3>Editar empresa</h3>
                    <span>Nome: </span>
                    <input className={styles.advInput}></input>
                    <span>Código: </span>
                    <input className={`${styles.advInput} ${styles.smallInput}`}></input>
                    <br />
                    <span>Tipo de lucro: </span>
                    <input type="radio" id="real" name="lucro" defaultValue="real" />
                    <label htmlFor="real">Real</label>
                    <input type="radio" id="presumido" name="lucro" defaultValue="presumido" />
                    <label htmlFor="presumido">Presumido</label>
                    <span>Equipe: </span>
                    <input className={`${styles.advInput} ${styles.smallInput}`}></input>
                    <br />
                    <span>Responsável da equipe: </span>
                    <input className={styles.advInput}></input>
                    <br />
                    <button type="button">
                        Cancelar
                    </button>
                    <button type="button">
                        Confirmar
                    </button>
                </div>
            </div>
        </ModalContent>
    )
}