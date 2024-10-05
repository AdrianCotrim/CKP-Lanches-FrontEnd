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


btnAddProduto.addEventListener('click', function(event) {
    event.preventDefault();  // Prevenir o comportamento padrão do formulário, se houver
    
    // Pegando os valores do formulário
    const produtoDTO = {
        productName: document.getElementById('nome').value,
        productValue: parseFloat(document.getElementById('valor').value),
        description: document.getElementById('descricao').value,
        supplies: []  // Ajuste de acordo com sua necessidade
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
});
