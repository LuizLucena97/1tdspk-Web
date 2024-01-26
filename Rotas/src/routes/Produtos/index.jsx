import { Link } from "react-router-dom"
import { listaProdutos } from "../../components/listaProdutos"

export default function Produtos() {

    return (
        <main class="lista-itens">
            <section class="conteiner-1">
                {listaProdutos.map((produto, index) => (
                    <div className="card-itens" key={index}>
                        <img src={`${produto.imagem}`} alt={produto.modelo} />
                        <h3>{produto.modelo}</h3>
                        <p>{produto.marca}</p>
                        <p>{produto.descricao}</p>
                        <p>Preço: R$ {produto.preco}</p>
                        <Link to={`/produtos/editar/`}>Descrição</Link>
                    </div>
                ))}

            </section>
        </main>
    )
}