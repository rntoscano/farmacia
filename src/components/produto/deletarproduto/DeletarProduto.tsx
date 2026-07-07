import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Produto } from '../../../models/Produto';
import { deletar, listar } from '../../../services/Service';

function DeletarProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: '',
    descricao: '',
    quantidade: 0,
    laboratorio: '',
    preco: 0,
    foto: '',
    categoria: {
      id: 0,
      nome: '',
      descricao: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  async function buscarProdutoPorId(id: string) {
    try {
      await listar<Produto>(`/produtos/${id}`, setProduto);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  }

  async function deletarProduto() {
    if (id === undefined) return;

    try {
      setIsLoading(true);

      await deletar(`/produtos/${id}`);

      alert('Produto deletado com sucesso!');
      navigate('/produtos');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert('Não foi possível deletar o produto.');
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate('/produtos');
  }

  return (
    <div className="container mx-auto my-10 flex justify-center px-4">
      <div className="flex w-full max-w-xl flex-col gap-5 rounded-lg border border-slate-300 p-8 text-center shadow">
        <h1 className="text-3xl font-bold">
          Deletar Produto
        </h1>

        <p className="text-lg">
          Você tem certeza que deseja apagar o produto abaixo?
        </p>

        <div className="rounded bg-slate-100 p-4 text-left">
          <p>
            <strong>Nome:</strong> {produto.nome}
          </p>

          <p>
            <strong>Descrição:</strong> {produto.descricao}
          </p>

          <p>
            <strong>Laboratório:</strong> {produto.laboratorio}
          </p>

          <p>
            <strong>Categoria:</strong> {produto.categoria.nome}
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
            onClick={deletarProduto}
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

export default DeletarProduto;