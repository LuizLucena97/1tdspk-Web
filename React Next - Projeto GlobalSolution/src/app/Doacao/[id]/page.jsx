"use client"

import { useEffect, useState } from 'react';
import './Doacao.scss';
import { Philosopher } from 'next/font/google';

const philo = Philosopher({
    subsets: ['latin'],
    weight: ['400', '700']
});

export default function Doacao({ params }) {
    const formId = params.id == 0 ? '' : params.id

    const [novo, setNovo] = useState({
        nome_completo: '',
        email: '',
        telefone: '',
        forma_pagamento: 'cartao',
        valor: ''
    });

    let metodo = 'post'

    const handleChange = e => {
        setNovo({ ...novo, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:8080/GlobalSolution-BabyCare/rest/doacao`,{
            method: metodo,
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(novo)
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Doação enviada com sucesso!');
                } else {
                    console.error('Erro ao enviar a doação.');
                }
            })
            .catch((error) => {
                console.error('Erro ao enviar a doação:', error);
            });

        alert("Doação enviada com sucesso!");
        window.location.href = '/Doacao/0';
    };

    useEffect(()=>{
        if(formId){
            fetch(`http://localhost:8080/GlobalSolution-BabyCare/rest/doacao`)
            .then(resp => resp.json())
            .then(resp => setNovo(resp))
            .catch(error => console.error(error))     
        }
    },[formId])


    return (
        <main className="mainDoacao">
            <h1 className={philo.className}>Doação</h1>
            <h2 className={philo.className}>Qualquer quantia é mais que bem-vinda</h2>

            <form className="formDoar" onSubmit={handleSubmit}>
                <label htmlFor="nome_completo">Nome Completo:</label>
                <input
                    type="text"
                    id="nome_completo"
                    name="nome_completo"
                    value={novo.nome_completo}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={novo.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="telefone">Telefone:</label>
                <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={novo.telefone}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="forma_pagamento">Forma de Pagamento:</label>
                <select
                    id="forma_pagamento"
                    name="forma_pagamento"
                    value={novo.forma_pagamento}
                    onChange={handleChange}
                    required
                >
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="boleto">Boleto Bancário</option>
                </select>

                <label htmlFor="valor">Valor da Doação:</label>
                <input
                    type="number"
                    id="valor"
                    name="valor"
                    min="1"
                    step="any"
                    value={novo.valor}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Doar</button>
            </form>
        </main>
    );
}
