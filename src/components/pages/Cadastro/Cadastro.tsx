import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  descricao: z.string().min(1, "A descrição é obrigatória"),
  valor: z
    .number()
    .min(0, "O valor deve ser maior ou igual a 0")
    .positive("O valor deve ser um número positivo"),
  disponivel: z
    .enum(["sim", "nao"])
    .refine((val) => val === "sim" || val === "nao", {
      message: "Selecione uma opção válida",
    }),
});

type FormData = z.infer<typeof schema>;

interface CadastroProps {
  onSubmit: (data: FormData) => void;
}

const Cadastro: React.FC<CadastroProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Cadastro de Produtos 🍉
        </h1>

        {/* Campo Nome */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Nome do Produto:</label>
          <input
            {...register("nome")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Digite o nome do produto"
          />
          {errors.nome && (
            <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
          )}
        </div>

        {/* Campo Descrição */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Descrição:</label>
          <textarea
            {...register("descricao")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Digite a descrição do produto"
          />
          {errors.descricao && (
            <p className="text-red-500 text-sm mt-1">
              {errors.descricao.message}
            </p>
          )}
        </div>

        {/* Campo Valor */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Valor do Produto:</label>
          <input
            type="number"
            step="0.01"
            {...register("valor", { valueAsNumber: true })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Digite o valor"
          />
          {errors.valor && (
            <p className="text-red-500 text-sm mt-1">{errors.valor.message}</p>
          )}
        </div>

        {/* Campo Disponível */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">
            Disponível para Venda:
          </label>
          <select
            {...register("disponivel")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>
          {errors.disponivel && (
            <p className="text-red-500 text-sm mt-1">
              {errors.disponivel.message}
            </p>
          )}
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
