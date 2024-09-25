// Modal
var modalAddPedido = document.getElementById("janelaRegisPedido")
var btnAdd = document.getElementById("registrarPedido")
const obs = document.getElementById('obs')

// Exibe modal na tela
btnAdd.addEventListener("click", function() {
    modalAddPedido.style.display = "flex"
})

modalAddPedido.addEventListener("click", function(event) {
    if(event.target.textContent == 'Concluir'){
        modalAddPedido.style.display = "none"
    }
    if(event.target.textContent == 'Cancelar'){
        modalAddPedido.style.display = "none"
    }
})

let pedido = []

function addItemToList(item) {
    const produto = {
        name: item,    
        quantity: 1,
        obs: ""
    }

    const itemList = document.getElementById('itemList');
    const itemElement = document.createElement('div');
    const nome = document.createElement('p');
    const quantidade = document.createElement('p');
    const removerUnidade = document.createElement('i');

    itemElement.classList.add('item');
    removerUnidade.classList.add('fa-solid');
    removerUnidade.classList.add('fa-minus');
    removerUnidade.classList.add('removerUnidade');
    nome.textContent = item;
    nome.classList.add('nome')
    quantidade.textContent = "x" + produto.quantity

    itemElement.appendChild(removerUnidade);
    itemElement.appendChild(nome);
    itemElement.appendChild(quantidade);
    itemList.appendChild(itemElement);

    pedido.push(produto)
}

document.getElementById('lanches').addEventListener('change', function() {
    const selectedItem = this.value;
    if (selectedItem) {
        if(pedido.some(item => item.name === selectedItem)){
            let itemIndex = pedido.findIndex(item => item.name === selectedItem)
            pedido[itemIndex].quantity += 1

            let itemLista = document.querySelectorAll(".item")
            itemLista.forEach((item) => {
                var info = item.querySelectorAll("p")
                if(selectedItem == info[0].textContent){
                    info[1].textContent = "x" + pedido[itemIndex].quantity
                }
            })

            this.value = ''; // Limpa a seleção
        }
        else{
            addItemToList(selectedItem);
            this.value = ''; // Limpa a seleção
        }
    }
});

document.getElementById('bebidas').addEventListener('change', function() {
    const selectedItem = this.value;
    if (selectedItem) {
        if(pedido.some(item => item.name === selectedItem)){
            var itemIndex = pedido.findIndex(item => item.name === selectedItem)
            pedido[itemIndex].quantity += 1

            let itemLista = document.querySelectorAll(".item")
            itemLista.forEach((item) => {
                var info = item.querySelectorAll("p")
                if(selectedItem == info[0].textContent){
                    info[1].textContent = "x" + pedido[itemIndex].quantity
                }
            })

            this.value = ''; // Limpa a seleção
        }
        else{
            addItemToList(selectedItem);
            this.value = ''; // Limpa a seleção
        }
    }
});

// Remove unidade do item
modalAddPedido.addEventListener("click", function(event){
    if(event.target.classList.contains("removerUnidade")){
        var produto = event.target.parentElement
        var nome = produto.querySelectorAll('p')[0].textContent;

        pedido.forEach((item) => {
            if(nome == item.name){
                var index = pedido.indexOf(item)

                if(pedido[index].quantity == 1){
                    event.target.parentNode.remove()
                    pedido.splice(index, 1)
                }
                else{
                    pedido[index].quantity -= 1
                    let itemLista = document.querySelectorAll(".item")

                    itemLista.forEach((item) => {
                        var info = item.querySelectorAll("p")
                        if(nome == info[0].textContent){
                            info[1].textContent = "x" + pedido[index].quantity
                        }
                    })
                }
                console.log(pedido);    
            }
        }) 
    }
})

let ultimoItemClicado
// Seleciona item
modalAddPedido.addEventListener("click", function(event){
    if(event.target.classList.contains("nome")){
        let itemAtual = event.target
        if(ultimoItemClicado && ultimoItemClicado.textContent != itemAtual.textContent){
            ultimoItemClicado.classList.remove("selecionado")   
        }
        itemAtual.classList.add("selecionado")
        let nomes = document.querySelectorAll(".nome")

        nomes.forEach((nome) => {
            if(nome.classList.contains("selecionado")){
                itemIndex = pedido.findIndex(item => item.name === nome.textContent)
                obs.value = pedido[itemIndex].obs
            }
        })
        ultimoItemClicado = itemAtual   
    }
})

// Observação
obs.addEventListener('input', function() {
    const valor = obs.value; 
    let nomes = document.querySelectorAll(".nome")

    nomes.forEach((nome) => {
        if(nome.classList.contains("selecionado")){
            itemIndex = pedido.findIndex(item => item.name === nome.textContent)
            pedido[itemIndex].obs = valor
        }
    })
})
