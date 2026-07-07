import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Categoria } from '../../../models/Categoria';
import type { Produto } from '../../../models/Produto';
import { atualizar, cadastrar, listar } from '../../../services/Service';

function FormProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categorias, setCategorias] = useState<Categoria[]>([]);

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

  useEffect(() => {
    async function carregarDados() {
      try {
        await listar<Categoria[]>('/categorias', setCategorias);

        if (id !== undefined) {
          await listar<Produto>(`/produtos/${id}`, setProduto);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }

    carregarDados();
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    switch (name) {
      case 'nome':
        setProduto({ ...produto, nome: value });
        break;

      case 'descricao':
        setProduto({ ...produto, descricao: value });
        break;

      case 'laboratorio':
        setProduto({ ...produto, laboratorio: value });
        break;

      case 'foto':
        setProduto({ ...produto, foto: value });
        break;

      case 'quantidade':
        setProduto({ ...produto, quantidade: Number(value) });
        break;

      case 'preco':
        setProduto({ ...produto, preco: Number(value) });
        break;
    }
  }

  function atualizarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    const categoriaSelecionada = categorias.find(
      (categoria) => categoria.id === Number(e.target.value)
    );

    if (categoriaSelecionada) {
      setProduto({
        ...produto,
        categoria: categoriaSelecionada,
      });
    }
  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (produto.categoria.id === 0) {
      alert('Selecione uma categoria.');
      return;
    }

    try {
      if (id === undefined) {
        await cadastrar<Produto>('/produtos', produto, setProduto);
      } else {
        await atualizar<Produto>('/produtos', produto, setProduto);
      }

      navigate('/produtos');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Não foi possível salvar o produto.');
    }
  }

  return (
    <div className="container mx-auto my-10 flex justify-center px-4">
      <form
        className="flex w-full max-w-2xl flex-col gap-4 rounded-lg border border-slate-300 p-8 shadow"
        onSubmit={gerarNovoProduto}
      >
        <h1 className="text-center text-3xl font-bold">
          {id === undefined ? 'Cadastrar Produto' : 'Editar Produto'}
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do produto</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Digite o nome do produto"
            value={produto.nome}
            onChange={atualizarEstado}
            className="rounded border border-slate-300 p-3 outline-none focus:border-indigo-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            placeholder="Digite a descrição"
            value={produto.descricao}
            onChange={atualizarEstado}
            className="rounded border border-slate-300 p-3 outline-none focus:border-indigo-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="laboratorio">Laboratório</label>
          <input
            type="text"
            id="laboratorio"
            name="laboratorio"
            placeholder="Digite o laboratório"
            value={produto.laboratorio}
            onChange={atualizarEstado}
            className="rounded border border-slate-300 p-3 outline-none focus:border-indigo-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            min="0"
            value={produto.quantidade}
            onChange={atualizarEstado}
            className="rounded border border-slate-300 p-3 outline-none focus:border-indigo-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preco">Preço</label>
          <input
            type="number"
            id="preco"
            name="preco"
            min="0"
            step="0.01"
            placeholder="Exemplo: 19.90"
            value={produto.preco}
            onChange={atualizarEstado}
            className="rounded border border-slate-300 p-3 outline-none focus:border-indigo-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto">Link da foto</label>
          <input
            type="url"
            id="foto"
            name="foto"
            placeholder="Cole o link da imagem"
            value={produto.foto}
            onChange={atualizarEstado}
            className="rounded border border-slate-300 p-3 outline-none focus:border-indigo-700"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria">Categoria</label>

          <select
            id="categoria"
            value={produto.categoria.id}
            onChange={atualizarCategoria}
            className="rounded border border-slate-300 p-3 outline-none focus:border-indigo-700"
            required
          >
            <option value={0} disabled>
              Selecione uma categoria
            </option>

            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
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

export default FormProduto;