import React from "react";

interface Produto {
  nome: string;
  valor: number;
}

interface ListagemProps {
  produtos: Produto[];
  voltar: () => void;
}

const Listagem: React.FC<ListagemProps> = ({ produtos, voltar }) => {
  // Ordena os produtos pelo valor do menor para o maior
  const produtosOrdenados = [...produtos].sort((a, b) => a.valor - b.valor);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Produtos</h1>

      {/* Tabela de produtos */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {produtosOrdenados.map((produto, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {produto.nome}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                R$ {produto.valor.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botão para voltar ao cadastro */}
      <button
        onClick={voltar}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Cadastrar Novo Produto
      </button>
    </div>
  );
};

export default Listagem;
