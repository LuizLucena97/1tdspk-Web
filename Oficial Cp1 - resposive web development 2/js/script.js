//criar o evento de ao clicar no botão "criar tarefa" construir o objeto

//criar o objeto do tipo descrição

// ao preencher todos os campos e clicar no botao "criar tarefa", criar o objeto do tipo tarefa com os respectivos atributos

// ao criar o objeto, exibir os dados do objeto na tabela 'lista de tarefas', com os respectivos atributos em seus campos 




// Função para verificar se todos os campos estão preenchidos
function verificarCamposPreenchidos() {
    const campos = document.querySelectorAll('.atributos-inserir input');
    for (const campo of campos) {
        if (
            campo.name !== "valor" && 
            campo.name !== "duracao" && 
            campo.value.trim() === ''
        ) {
            return false;
        }
    }
    return true;
}

// Função para habilitar ou desabilitar o botão "Criar Tarefa"
function atualizarBotaoCriarTarefa() {
    const botaoCriar = document.getElementById('botao-criar-tarefa');
    botaoCriar.disabled = !verificarCamposPreenchidos();
}

// Event listeners para inputs
const camposInputs = document.querySelectorAll('.atributos-inserir input');
camposInputs.forEach(input => {
    input.addEventListener('input', () => {
        atualizarBotaoCriarTarefa();
    });
});

// Event listener para o botão "Criar Tarefa"
const botaoCriar = document.getElementById('botao-criar-tarefa');
botaoCriar.addEventListener('click', () => {
    if (verificarCamposPreenchidos()) {
        const tarefa = {
            tarefa: camposInputs[0].value,
            descricao: camposInputs[1].value,
            autor: camposInputs[2].value,
            departamento: camposInputs[3].value,
            importancia: camposInputs[4].value,
            valor: camposInputs[5].value,     // Opcional: Pode ficar vazio
            duracao: camposInputs[6].value    // Opcional: Pode ficar vazio
        };
        console.log('Tarefa criada:', tarefa);
        // Aqui você pode fazer o que desejar com o objeto tarefa, como enviar para um servidor, armazenar localmente, etc.

        const tabelaImportancia = document.querySelector('.main-importancia table tbody');
        
        // Criar a nova linha com os dados da tarefa
        const novaLinhaImportancia = document.createElement('tr');
        const colunaDescricao = document.createElement('td');
        colunaDescricao.textContent = tarefa.descricao;
        const colunaImportancia = document.createElement('td');
        colunaImportancia.textContent = tarefa.importancia;
        novaLinhaImportancia.appendChild(colunaDescricao);
        novaLinhaImportancia.appendChild(colunaImportancia);

        // Encontrar a posição correta para inserir a nova linha com base na importância
        let inserido = false;
        for (let i = 0; i < tabelaImportancia.rows.length; i++) {
            const linhaAtual = tabelaImportancia.rows[i];
            const importanciaAtual = parseInt(linhaAtual.cells[1].textContent);
            if (tarefa.importancia < importanciaAtual) {
                tabelaImportancia.insertBefore(novaLinhaImportancia, linhaAtual);
                inserido = true;
                break;
            }
        }
        if (!inserido) {
            tabelaImportancia.appendChild(novaLinhaImportancia);
        }
        


        // Adicionar a nova tarefa à tabela "Lista de Tarefas"
        const tabelaListaTarefas = document.querySelector('.main-tarefas table tbody');
        const novaLinha = document.createElement('tr');

        const botaoConcluida = document.createElement('button');
        botaoConcluida.textContent = 'Concluída';
        const botaoConcluidaCelula = document.createElement('td');
        botaoConcluidaCelula.classList.add('botao-concluida-celula'); // Adicione uma classe à célula
        botaoConcluidaCelula.appendChild(botaoConcluida);
        botaoConcluida.addEventListener('click', () => {
            novaLinhaImportancia.remove();


            // Mova a tarefa para a tabela "Tarefas Concluídas"
            const tabelaTarefasConcluidas = document.querySelector('.main-concluidas table tbody');
            const novaLinhaConcluida = document.createElement('tr');
        
            // Botão de Excluir
            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.addEventListener('click', () => {
                // Remova a linha da tabela "Tarefas Concluídas" ao clicar no botão Excluir
                novaLinhaConcluida.remove();
                
            });
        
            // Adicione o botão Excluir à primeira célula da linha
            const colunaExcluir = document.createElement('td');
            colunaExcluir.appendChild(botaoExcluir);
            novaLinhaConcluida.appendChild(colunaExcluir);
        
            // Crie novas células para as outras colunas na tabela "Tarefas Concluídas"
            for (const propriedade in tarefa) {
                const colunaConcluida = document.createElement('td');
                colunaConcluida.textContent = tarefa[propriedade];
                novaLinhaConcluida.appendChild(colunaConcluida);
            }
        
            // Adicione a nova linha à tabela "Tarefas Concluídas"
            tabelaTarefasConcluidas.appendChild(novaLinhaConcluida);
        
            // Remova a tarefa da tabela "Lista de Tarefas"
            novaLinha.remove();
        
            console.log('Tarefa concluída:', tarefa);
        });     
        
        
        botaoConcluidaCelula.appendChild(botaoConcluida);
        novaLinha.appendChild(botaoConcluidaCelula);
     
        
        for (const propriedade in tarefa) {
            const coluna = document.createElement('td');
            coluna.textContent = tarefa[propriedade];
            novaLinha.appendChild(coluna);
        }
        
        tabelaListaTarefas.appendChild(novaLinha);

        
        // Limpar campos de entrada após adicionar a tarefa
        camposInputs.forEach(input => {
            input.value = '';
        });

        // Atualizar o botão
        atualizarBotaoCriarTarefa();
    }

});

