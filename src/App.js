import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [newProducts, setNewProducts] = useState([]);

  function addProduct(product) {
    // O produto novo fica no estado local, junto aos produtos recebidos da API.
    const productWithId = {
      ...product,
      id: `local-${Date.now()}`,
      isLocal: true
    };

    setNewProducts((currentProducts) => [productWithId, ...currentProducts]);
  }

  return (
    <main className="page">
      <header className="topbar">
        <div className="topbar-content">
          <a className="brand" href="/" aria-label="Vitrine Store - início">
            <span className="brand-icon"><i className="pi pi-shopping-bag" /></span>
            <span>vitrine<span className="brand-highlight">store</span></span>
          </a>
          <span className="topbar-caption">Sua próxima descoberta está aqui</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">CURADORIA PARA O SEU DIA A DIA</span>
          <h1>Encontre algo <span>incrível.</span></h1>
          <p>Explore nossa seleção de produtos e adicione seus próprios itens à vitrine.</p>
        </div>
        <div className="hero-decoration"><i className="pi pi-sparkles" /></div>
      </section>

      <div className="content">
        <ProductForm onAddProduct={addProduct} />
        <ProductList newProducts={newProducts} />
      </div>

      <footer className="footer">
        <span>Vitrine Store</span>
        <span>Projeto acadêmico • React + Axios + PrimeReact</span>
      </footer>
    </main>
  );
}

export default App;