import { useEffect, useState } from 'react';
import type { Produto } from '../../../models/Produto';
import { listar } from '../../../services/Service';
import CardProduto from '../cardproduto/CardProduto';

function ListarProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function buscarProdutos() {
    try {
      setIsLoading(true);
      await listar<Produto[]>('/produtos', setProdutos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Produtos
      </h1>

      {isLoading && (
        <p className="text-center text-lg">
          Carregando produtos...
        </p>
      )}

      {!isLoading && produtos.length === 0 && (
        <p className="text-center text-lg">
          Nenhum produto foi encontrado.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}

export default ListarProdutos;