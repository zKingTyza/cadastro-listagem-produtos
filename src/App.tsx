import React, { useState } from "react";
import Cadastro from "./components/pages/Cadastro/Cadastro";
import Listagem from "./components/pages/Listagem/Listagem";

interface Produto {
  nome: string;
  descricao: string;
  valor: number;
  disponivel: string;
}

const App: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pagina, setPagina] = useState<"cadastro" | "listagem">("cadastro");

  const handleCadastro = (produto: Produto) => {
    setProdutos((prev) => [...prev, produto]);
    setPagina("listagem");
  };

  return (
    <div>
      {pagina === "cadastro" && <Cadastro onSubmit={handleCadastro} />}
      {pagina === "listagem" && (
        <Listagem produtos={produtos} voltar={() => setPagina("cadastro")} />
      )}
    </div>
  );
};

export default App;
