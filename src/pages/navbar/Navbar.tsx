import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div className="w-full bg-indigo-900 py-4 text-white">
        <div className="container mx-auto flex justify-between">
          <Link to="/home" className="text-lg font-bold">
  Farmácia
</Link>

          <div className="flex gap-4">
            <div>Produtos</div>
            <div>Categorias</div>
            <div>Cadastro</div>
            <div>Login</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;