import { listaProdutos } from "../../components/listaProdutos"
export default function Home(){

    const produtosParaExibir = listaProdutos.slice(1, 3);

    return (
      <main>
        {produtosParaExibir.map((produto, index) => (
          <div key={index} className="card-promo">
            <img src={produto.imagem} alt={`${produto.modelo} - ${produto.marca}`} />
            <h2>{produto.modelo}</h2>
            <p>{produto.marca}</p>
            <p>{produto.descricao}</p>
            <p>Preço: R${produto.preco}</p>
          </div>
        ))}
      </main>
    )
}

