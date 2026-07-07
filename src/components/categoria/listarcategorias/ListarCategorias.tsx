import { useEffect, useState } from 'react';
import type { Categoria } from '../../../models/Categoria';
import { listar } from '../../../services/Service';
import CardCategoria from '../cardcategoria/CardCategoria';

function ListarCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function buscarCategorias() {
    try {
      setIsLoading(true);
      await listar<Categoria[]>('/categorias', setCategorias);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Categorias
      </h1>

      {isLoading && (
        <p className="text-center text-lg">Carregando categorias...</p>
      )}

      {!isLoading && categorias.length === 0 && (
        <p className="text-center text-lg">
          Nenhuma categoria foi encontrada.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categorias.map((categoria) => (
          <CardCategoria
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </div>
    </div>
  );
}

export default ListarCategorias;