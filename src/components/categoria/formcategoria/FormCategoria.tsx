import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Categoria } from '../../../models/Categoria';
import { atualizar, cadastrar, listar } from '../../../services/Service';

function FormCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: '',
    descricao: '',
  });

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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (id === undefined) {
        await cadastrar('/categorias', categoria, setCategoria);
      } else {
        await atualizar('/categorias', categoria, setCategoria);
      }

      navigate('/categorias');
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
    }
  }

  return (
    <div className="container mx-auto my-10 flex justify-center px-4">
      <form
        className="flex w-full max-w-2xl flex-col gap-4 rounded-lg border border-slate-300 p-8 shadow"
        onSubmit={gerarNovaCategoria}
      >
        <h1 className="text-center text-3xl font-bold">
          {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome da categoria</label>

          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Digite o nome da categoria"
            value={categoria.nome}
            onChange={atualizarEstado}
            className="rounded border border-slate-300 p-3 outline-none focus:border-indigo-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição</label>

          <textarea
            id="descricao"
            name="descricao"
            placeholder="Digite a descrição da categoria"
            value={categoria.descricao}
            onChange={atualizarEstado}
            className="min-h-28 rounded border border-slate-300 p-3 outline-none focus:border-indigo-700"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded bg-indigo-900 py-3 font-bold text-white hover:bg-indigo-700"
        >
          {id === undefined ? 'Cadastrar' : 'Atualizar'}
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;