import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Categoria } from '../../../models/Categoria';
import { deletar, listar } from '../../../services/Service';

function DeletarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>(
    {} as Categoria
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      buscarCategoriaPorId(id);
    }
  }, [id]);

  async function buscarCategoriaPorId(id: string) {
    try {
      await listar<Categoria>(`/categorias/${id}`, setCategoria);
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
    }
  }

  async function deletarCategoria() {
    if (id === undefined) return;

    try {
      setIsLoading(true);

      await deletar(`/categorias/${id}`);

      alert('Categoria deletada com sucesso!');
      navigate('/categorias');
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      alert('Não foi possível deletar a categoria.');
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate('/categorias');
  }

  return (
    <div className="container mx-auto my-10 flex justify-center px-4">
      <div className="flex w-full max-w-xl flex-col gap-5 rounded-lg border border-slate-300 p-8 text-center shadow">
        <h1 className="text-3xl font-bold">
          Deletar Categoria
        </h1>

        <p className="text-lg">
          Você tem certeza que deseja apagar a categoria abaixo?
        </p>

        <div className="rounded bg-slate-100 p-4 text-left">
          <p>
            <strong>Nome:</strong> {categoria.nome}
          </p>

          <p>
            <strong>Descrição:</strong> {categoria.descricao}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={retornar}
            className="rounded bg-slate-500 px-5 py-3 font-bold text-white hover:bg-slate-700"
          >
            Cancelar
          </button>

          <button
            onClick={deletarCategoria}
            disabled={isLoading}
            className="rounded bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Deletando...' : 'Sim, deletar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;