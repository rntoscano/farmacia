import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="w-full bg-indigo-900 py-4 text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4">
        <Link to="/home" className="text-lg font-bold">
          Farmácia Home
        </Link>

        <div className="flex flex-wrap gap-4">
          <Link to="/produtos" className="hover:underline">
            Produtos
          </Link>

          <Link to="/cadastrarProduto" className="hover:underline">
            Cadastrar Produto
          </Link>

          <Link to="/categorias" className="hover:underline">
            Categorias
          </Link>

          <Link to="/cadastrarCategoria" className="hover:underline">
            Cadastrar Categoria
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Navbar;