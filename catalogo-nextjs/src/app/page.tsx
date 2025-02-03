import Header from "../components/Header";
import Tabela from "../components/Tabela";
import { User } from "@/components/columns";
import React from "react";

async function getUsers(): Promise<User[]>{
  const res = await fetch(
    'https://675772e7c0a427baf94cc80f.mockapi.io/tabelaempresa'
  )
  const userData = await res.json()
  return userData
}

// criação do método POST

// async function postUsers(res: Promise<User[]>){
//   await fetch('https://675772e7c0a427baf94cc80f.mockapi.io/tabelaempresa'
//     , {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json, text/plain, */*',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({a: 7, str: 'Some string: &=&'})
//   }).then(res => res.json())
//     .then(res => console.log(res));
// }

export default async function Home() {

  const users = await getUsers();

  const year = new Date().getFullYear();

  return (
    <div>
      <Header />
      <h1>Fechamento Contábil {year}</h1>
      <h3>Empresas - Contabilidade Megasult</h3>
      <Tabela users={users}/>
    </div>
  );
}
