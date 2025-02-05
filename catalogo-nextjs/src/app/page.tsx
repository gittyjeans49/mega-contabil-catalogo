import Header from "../components/Header";
import Tabela from "../components/Tabela";
import { User } from "@/components/columns";
import React from "react";
import { GET } from "../app/api/(auth)/empresas/route";

async function getUsers(): Promise<User[]> {
  // const res = await fetch(
  //   'https://675772e7c0a427baf94cc80f.mockapi.io/tabelaempresa'
  // ) --> old fetch
  const res = await GET()
  const userData = await res.json()
  return userData
}


export default async function Home() {

  const users = await getUsers();

  const year = new Date().getFullYear();

  return (
    <div>
      <Header />
      <h1>Fechamento Contábil {year}</h1>
      <h3>Empresas - Contabilidade Megasult</h3>
      <Tabela users={users} />
    </div>
  );
}
