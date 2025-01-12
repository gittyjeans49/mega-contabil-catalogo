import React from "react";
import styles from "../styles/main.module.css"
import { ModalContent, ModalBody, Button } from "@nextui-org/react";


export default function EditarEmpresa() {

    return (
        <ModalContent>
            {(onClose) => (
                <div className={styles.popup} onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        onClose();
                    }
                }}>
                    <ModalBody className={styles.popupContent}>
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
                        <Button onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button>
                            Confirmar
                        </Button>
                    </ModalBody>
                </div>
            )}
        </ModalContent>
    )
}