import { Link } from 'react-router-dom';
import type { Produto } from '../../../models/Produto';

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-300 shadow">
      <img
        src={produto.foto}
        alt={produto.nome}
        style={{
          width: '100%',
          height: '120px',
          objectFit: 'contain',
        }}
      />

      <div className="flex flex-col gap-2 p-5">
        <h2 className="text-xl font-bold text-indigo-900">
          {produto.nome}
        </h2>

        <p>{produto.descricao}</p>

        <p>
          <span className="font-bold">Laboratório:</span>{' '}
          {produto.laboratorio}
        </p>

        <p>
          <span className="font-bold">Quantidade:</span>{' '}
          {produto.quantidade}
        </p>

        <p>
          <span className="font-bold">Categoria:</span>{' '}
          {produto.categoria?.nome}
        </p>

        <p className="text-lg font-bold text-green-700">
          {produto.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>

      <div className="flex">
        <Link
          to={`/editarProduto/${produto.id}`}
          className="w-1/2 bg-indigo-600 py-3 text-center font-semibold text-white hover:bg-indigo-800"
        >
          Editar
        </Link>

        <Link
          to={`/deletarProduto/${produto.id}`}
          className="w-1/2 bg-red-500 py-3 text-center font-semibold text-white hover:bg-red-700"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardProduto;