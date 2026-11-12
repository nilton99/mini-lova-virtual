import { useEffect, useState } from "react";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import ProductCard from "./ProductCard";

const API_URL = "https://fakestoreapi.com/products";

function ProductList({ newProducts }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (err) {
        setError("Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const allProducts = [...newProducts, ...products];

  return (
    <section className="products-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">NOSSA VITRINE</span>
          <h2>Produtos em destaque</h2>
          <p>Produtos da API e itens adicionados por você.</p>
        </div>
        {!loading && <span className="product-count">{allProducts.length} produtos</span>}
      </div>

      {loading && (
        <div className="loading-state">
          <ProgressSpinner style={{ width: "48px", height: "48px" }} strokeWidth="4" />
          <p>Carregando produtos...</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-state">
          <Message severity="error" text={error} />
          <button className="retry-button" onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid">
          {allProducts.map((product) => (
            <div className="col-12 sm:col-6 lg:col-4 xl:col-3" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;