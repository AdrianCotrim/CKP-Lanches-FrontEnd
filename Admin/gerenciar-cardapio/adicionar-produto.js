let btnAbrirAddProduto = document.getElementById("addInsumo")
let btnFecharAddProduto = document.getElementById("cancelar")
let btnAddProduto = document.getElementById("confirmarAddProduto")

let addProdutoModal = document.getElementById("adicionarInsumo")


const cardapio = document.getElementById("cardapio")

btnAbrirAddProduto.addEventListener("click", function(){
    addProdutoModal.style.display = "flex";
})

btnFecharAddProduto.addEventListener("click", function(){
    addProdutoModal.style.display = "none";
})

// Adiciona a lista de insumos incluidos no produto
var selectInsumos = document.getElementById("insumos");
var listaInsumos = document.getElementById("listaInsumos");
var insumos = [];

// Traz os insumos para o select
if(addProdutoModal.style.display = "flex"){
    fetch("http://localhost:8080/insumos", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(dados => {
        console.log(dados)
        let insumoslista = document.getElementById("insumos")
    
        dados.forEach(element => {
            let option = document.createElement("p");
            let addInsumo = document.createElement('i')
            addInsumo.classList.add('fas');
            addInsumo.classList.add('fa-plus');
            addInsumo.classList.add('novoInsumo');
            option.value = element.name;
            option.textContent = element.name;
            option.appendChild(addInsumo)
            insumoslista.appendChild(option)
            addInsumo.addEventListener('click', (event) => {
                let novoInsumo = document.createElement("li");
                let removerInsumo = document.createElement("i");
                let p =  event.target.parentNode;
                removerInsumo.classList.add("fa");
                removerInsumo.classList.add("fa-times");
                removerInsumo.id = `excluir-${p.value}`


                if(!insumos.some((insumo) => {return insumo === p.value})){
                    novoInsumo.textContent = p.value;
                    novoInsumo.appendChild(removerInsumo);
                    listaInsumos.appendChild(novoInsumo);
                    insumos.push(p.value)
                }


                removerInsumo.addEventListener('click', () => {
                    listaInsumos.removeChild(novoInsumo);
                    insumos =  insumos.filter(insumo => insumo !== novoInsumo.textContent)
                });
                console.log(insumos);
            });
        });
    })
    .catch(erro => console.log(erro))
};

selectInsumos.addEventListener("change", function(){
    if(this.value !== "Insumos"){
        
    }
})

const adicionarInsumo = document.querySelectorAll('.novoInsumo');
const listaAdicionados = document.getElementById('listaInsumos');

        addButtons.forEach(button => {
            button.addEventListener('click', () => {
                const produto = button.parentElement.querySelector('span').textContent;
                
                // Cria um novo elemento para a lista de adicionados
                const novoProduto = document.createElement('div');
                novoProduto.textContent = produto;
                novoProduto.classList.add('adicionado');
                
                // Adiciona o novo produto à lista de adicionados
                listaAdicionados.appendChild(novoProduto);
            });
        });



// btnAddProduto.addEventListener("click", function(){
//     console.log("Fui clicado")
//     const produto = document.createElement("div")
//     produto.classList.add("produto", "col-3", "m-3")

//     produto.innerHTML = `<div class="card">
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSU7lS-9pXVRVRzCu80X0ynHGF7C0AAXoTOQ&s" class="mt-3"> 
//     <h2 class="mt-3">Lol</h2>
//     <p class="mt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed dolor recusandae ullam voluptatem expedita maiores cum atque odio magni sunt pariatur dicta obcaecati nemo dolore soluta adipisci assumenda aut ea dolores iste ad quam repellendus, cupiditate optio. Est, tempora quia?</p>
//     <h3 class="align-items-right">R$00,00</h3>
//     </div>`

//     cardapio.appendChild(produto)
// })  

// function listaInsumoIds = function(){}

btnAddProduto.addEventListener('click', function(event) {
    event.preventDefault();  // Prevenir o comportamento padrão do formulário, se houver

    // fetch("http://localhost:8080/insumos", {
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Accept': 'application/json'
    //     },
    //     method: 'GET'
    //     })
    //     .then(response => response.json())
    //     .then(dados => {
    //         let insumosIds = [];

    //         dados.forEach(element => {
    //             insumos.forEach(insumo => {
    //                 if(insumo == element.name){
    //                     c
    //                     insumosIds.push(element.id)
    //                 }
    //             })
    //         }) 
    //     })
    //     .catch(erro => console.log(erro))

    // Pegando os valores do formulário
    console.log(insumos);
    
    const produtoDTO = {
        productName: document.getElementById('nome').value,
        productValue: parseFloat(document.getElementById('valor').value),
        description: document.getElementById('descricao').value,
        supplieNames: insumos,
        category: document.getElementById('categoria').value
    };

    // Criando o FormData
    const formData = new FormData();
    formData.append("produtoDTO", new Blob([JSON.stringify(produtoDTO)], {type: "application/json"}));  // Adiciona os dados do produto como JSON
    formData.append("imagem", document.getElementById('imagem').files[0]);  // Adiciona a imagem do input 'file'
    
    // Enviando a requisição POST
    fetch('http://localhost:8080/produtos', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`  // Adiciona o token de autorização
        },
        body: formData  // O corpo agora é o FormData com o JSON e a imagem
    })
    .then(response => response.json())
    .then(data => {
        console.log('Produto cadastrado:', data);
        // Atualizar o grid de produtos, ou realizar alguma ação adicional
    })
    .catch(error => console.error('Erro ao cadastrar produto:', error));

    //location.reload();
});
