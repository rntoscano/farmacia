import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="w-full bg-indigo-900 py-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/home" className="text-lg font-bold">
          Farmácia
        </Link>

        <div className="flex gap-4">
          <div>Produtos</div>

          <Link to="/categorias" className="hover:underline">
            Categorias
          </Link>

          <Link to="/cadastrarCategoria" className="hover:underline">
            Cadastrar Categoria
          </Link>

          <div>Login</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;