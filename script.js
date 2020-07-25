//1 - Referenciar o input
let input = document.querySelector('input[name=tarefa]');


//2 - Referenciar o button
let btn = document.querySelector('#botao');

//3 - Referenciar a lista
let lista = document.querySelector('#lista');
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas() {
    //Limpar a listagem de itens antes de renderizar novamente a tela
    lista.innerHTML = '';
    for(tarefa of tarefas){
        
        //1 - Criar o item da lista
        let itemLista = document.createElement('li');

        //2 - Adicionar classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //Adicionar o evento de clique no item da lista
        itemLista.onclick = function() {
            deletarTarefa(this);
        }
        //3 - Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        //4 - Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        //5 - Adicionar o item da lista na lista
        lista.appendChild(itemLista);
    }
}

//Executando a função para renderizar as tarefas
renderizarTarefas();

//1 - Necessário escutar o click do botão
btn.onclick = function(){
    //2 - Necessário capturar o valor digitado pelo usuário no input
    let novaTarefa = input.value;

    if(novaTarefa !== ""){
        //3 - Necessário atualizar a nova tarefa na lista(array) de tarefas e renderizar a tela
        tarefas.push(novaTarefa);

        //Executando a função para renderizar as tarefas
        renderizarTarefas();

        //Limpar o input
        input.value = '';

        // limpar mensagens de erro(spans)
        removerSpans();

        //Salva os novos dados no banco de dados
        salvarDadosNoStorage();

    } else {
        // limpar mensagens de erro(spans)
        removerSpans();        

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa informar a tarefa!');

        span.appendChild(msg);

        card.appendChild(span);
    }        
}

function removerSpans() {
    let spans = document.querySelectorAll('span');    

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i]);
    }
}

function deletarTarefa(tar) {
    // Remove a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    //Renderizar novamente a tela
    renderizarTarefas();

    //Salva os novos dados no banco de dados
    salvarDadosNoStorage();
}

function salvarDadosNoStorage(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}





















