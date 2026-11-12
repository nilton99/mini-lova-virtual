import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

function ProductCard({ product }) {
  const title = product.title || "Produto sem título";
  const description = product.description || "Sem descrição disponível.";
  const category = product.category || "Geral";

  const imageHeader = (
    <div className="product-image-wrap">
      <img src={product.image} alt={title} className="product-image" />
      {product.isLocal && <Tag value="NOVO" severity="success" className="new-tag" />}
    </div>
  );

  const cardFooter = (
    <div className="product-card-footer">
      <strong className="price">
        {Number(product.price || 0).toLocaleString("pt-BR", {
          style: "currency",
          currency: "USD"
        })}
      </strong>
      <span className="details-label"><i className="pi pi-arrow-up-right" /> Detalhes</span>
    </div>
  );

  return (
    <Card className="product-card" header={imageHeader} footer={cardFooter}>
      <div className="product-info">
        <span className="category">{category}</span>
        <h3 title={title}>{title}</h3>
        <p>{description}</p>
        {product.rating && (
          <span className="rating">
            <i className="pi pi-star-fill" /> {product.rating.rate} <small>({product.rating.count})</small>
          </span>
        )}
      </div>
    </Card>
  );
}

export default ProductCard;