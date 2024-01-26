import { listaProdutos } from "../../components/listaProdutos"

export default function EditarProdutos(){

    const produtosParaExibir = listaProdutos.slice(0, 1);

    return (
      <main>
        {produtosParaExibir.map((produto, index) => (
          <div key={index} className="card-promo">
            <img src={produto.imagem} alt={`${produto.modelo} - ${produto.marca}`} />
            <h2>{produto.modelo}</h2>
            <p>{produto.descricaoGeral}</p>
          </div>
        ))}
      </main>
    )
}
