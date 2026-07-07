import { Link } from 'react-router-dom';
import type { Categoria } from '../../../models/Categoria';

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="flex flex-col rounded border border-slate-300">
      <div className="rounded-t bg-indigo-900 px-6 py-3 text-2xl font-bold text-white">
        Categoria
      </div>

      <div className="flex flex-col gap-3 p-6">
        <p className="text-xl font-semibold">{categoria.nome}</p>

        <p>{categoria.descricao}</p>
      </div>

      <div className="flex">
        <Link
          to={`/editarCategoria/${categoria.id}`}
          className="w-1/2 bg-indigo-600 py-3 text-center font-semibold text-white hover:bg-indigo-800"
        >
          Editar
        </Link>

        <Link
          to={`/deletarCategoria/${categoria.id}`}
          className="w-1/2 bg-red-500 py-3 text-center font-semibold text-white hover:bg-red-700"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;