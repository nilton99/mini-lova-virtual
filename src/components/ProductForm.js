import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

const initialForm = {
  title: "",
  price: null,
  category: "",
  description: "",
  image: ""
};

function ProductForm({ onAddProduct }) {
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState("");

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    if (!form.title.trim() || !form.category.trim() || !form.description.trim() ||
        !form.image.trim() || form.price === null || form.price <= 0) {
      setFeedback("Preencha todos os campos e informe um preço maior que zero.");
      return;
    }

    onAddProduct({
      ...form,
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      image: form.image.trim()
    });

    setForm(initialForm);
    setFeedback("Produto adicionado à vitrine com sucesso!");
  }

  return (
    <section className="form-section">
      <div className="form-intro">
        <span className="form-icon"><i className="pi pi-plus" /></span>
        <div>
          <span className="eyebrow">PERSONALIZE SUA VITRINE</span>
          <h2>Adicionar produto</h2>
          <p>Cadastre um novo item para exibi-lo junto aos produtos da loja.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-field">
          <label htmlFor="title">Nome do produto</label>
          <InputText id="title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Ex.: Fone Bluetooth" />
        </div>

        <div className="form-field">
          <label htmlFor="price">Preço (US$)</label>
          <InputNumber inputId="price" value={form.price} onValueChange={(e) => handleChange("price", e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={2} min={0} placeholder="0,00" className="w-full" />
        </div>

        <div className="form-field">
          <label htmlFor="category">Categoria</label>
          <InputText id="category" value={form.category} onChange={(e) => handleChange("category", e.target.value)} placeholder="Ex.: Eletrônicos" />
        </div>

        <div className="form-field">
          <label htmlFor="image">URL da imagem</label>
          <InputText id="image" value={form.image} onChange={(e) => handleChange("image", e.target.value)} placeholder="https://..." />
        </div>

        <div className="form-field form-field-full">
          <label htmlFor="description">Descrição</label>
          <InputTextarea id="description" value={form.description} onChange={(e) => handleChange("description", e.target.value)} rows={3} autoResize placeholder="Descreva brevemente o produto..." />
        </div>

        <div className="form-actions">
          <Button type="submit" label="Adicionar à vitrine" icon="pi pi-plus" />
          {feedback && <Message severity={feedback.startsWith("Produto") ? "success" : "warn"} text={feedback} />}
        </div>
      </form>
    </section>
  );
}

export default ProductForm;