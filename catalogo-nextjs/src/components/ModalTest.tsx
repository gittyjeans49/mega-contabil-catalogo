import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import styles from "../styles/main.module.css"

export default function ModalTest() {
    return (
        <ModalContent>
            <div className={styles.popup}>
                <div className={styles.popupContent}>
                    <h3 className={styles.h3} >Opções avançadas</h3>
                    <form action="/action_page.php" />
                    <span>Pesquisar...</span>
                    {/* mudar o placeholder posteriormente com um script de acordo com o tipo de pesquisa selecionado */}
                    <input
                        className={styles.advInput}
                        type="text"
                        placeholder="Digite aqui..."
                    />
                    <br />
                    <span>Pesquisar:</span>
                    <select className="selectBox">
                        <option value={0}>Nome da Empresa</option>
                        <option value={1}>Código</option>
                    </select>
                    <br />
                    <span>Pesquisar em:</span>
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
                    <br />
                    <div>
                        <div className={styles.divLeft}>
                            <span>Tipo de lucro:</span>
                            <br />
                            <div className={styles.divRad}>
                                <input
                                    type="radio"
                                    id="ambos"
                                    name="lucro"
                                    defaultValue="ambos"
                                />
                                <label htmlFor="ambos">Ambos</label>
                                <br />
                                <input type="radio" id="real" name="lucro" defaultValue="real" />
                                <label htmlFor="real">Real</label>
                                <br />
                                <input
                                    type="radio"
                                    id="presumido"
                                    name="lucro"
                                    defaultValue="presumido"
                                />
                                <label htmlFor="presumido">Presumido</label>
                            </div>
                        </div>
                        <div className={styles.divRight}>
                            <span>Fechamento contábil:</span>
                            <br />
                            <span>Ref.:</span>
                            <select className="selectBox">
                                <option value={0}>Mês 01</option>
                                <option value={1}>Mês 02</option>
                                <option value={2}>Mês 03</option>
                                <option value={3}>Mês 04</option>
                                <option value={4}>Mês 05</option>
                                <option value={5}>Mês 06</option>
                                <option value={6}>Mês 07</option>
                                <option value={7}>Mês 08</option>
                                <option value={8}>Mês 09</option>
                                <option value={9}>Mês 10</option>
                                <option value={10}>Mês 11</option>
                                <option value={11}>Mês 12</option>
                            </select>
                            <div className={styles.divCheck}>
                                <input
                                    type="checkbox"
                                    id="contem"
                                    defaultValue="contem"
                                />
                                <label htmlFor="contem">Contém</label>
                                <br />
                                <input
                                    type="checkbox"
                                    id="faltando"
                                    defaultValue="faltando"
                                />
                                <label htmlFor="faltando">Faltando</label>
                            </div>
                        </div>
                    </div>
                    <button type="button">Limpar</button>
                    <button type="button">Pesquisar</button>
                </div>
            </div>
        </ModalContent>
    )
}