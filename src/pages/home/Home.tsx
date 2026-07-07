
function Home() {
  return (
    <div
      style={{
        backgroundColor: "#312e81",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          color: "white",
          width: "100%",
          maxWidth: "1280px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
            }}
          >
            Bem-vindo à Farmácia!
          </h2>

          <p
            style={{
              fontSize: "1.25rem",
            }}
          >
            Encontre produtos e categorias para cuidar da sua saúde.
          </p>

          <button
            style={{
              borderRadius: "0.5rem",
              color: "white",
              border: "2px solid white",
              padding: "0.5rem 1rem",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            Ver Produtos
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="https://i.imgur.com/fyfrilv.png"
            alt="Imagem da página inicial"
            style={{
              width: "66%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;