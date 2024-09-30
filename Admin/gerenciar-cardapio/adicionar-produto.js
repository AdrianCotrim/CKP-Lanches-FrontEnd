let btnAbrirAddProduto = document.getElementById("addInsumo")
let btnFecharAddProduto = document.getElementById("cancelar")
let btnAddProduto = document.getElementById("confirmar")

let addProdutoModal = document.getElementById("adicionarInsumo")


const cardapio = document.getElementById("cardapio")

btnAbrirAddProduto.addEventListener("click", function(){
    addProdutoModal.style.display = "flex";
})

btnFecharAddProduto.addEventListener("click", function(){
    addProdutoModal.style.display = "none";
})


btnAddProduto.addEventListener("click", function(){
    console.log("Fui clicado")
    const produto = document.createElement("div")
    produto.classList.add("produto", "col-3", "m-3")

    produto.innerHTML = `<div class="card">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSU7lS-9pXVRVRzCu80X0ynHGF7C0AAXoTOQ&s" class="mt-3"> 
    <h2 class="mt-3">Lol</h2>
    <p class="mt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed dolor recusandae ullam voluptatem expedita maiores cum atque odio magni sunt pariatur dicta obcaecati nemo dolore soluta adipisci assumenda aut ea dolores iste ad quam repellendus, cupiditate optio. Est, tempora quia?</p>
    <h3 class="align-items-right">R$00,00</h3>
    </div>`

    cardapio.appendChild(produto)
})  


document.getElementById('confirmarAddProduto').addEventListener('click', function(event) {
    
    const produtoDTO = {
        productName: document.getElementById('nome').value,
        productValue: parseFloat(document.getElementById('valor').value),
        imagem: document.getElementById('imagem').value,
        description: document.getElementById('descricao').value
    }
    
    // Aqui você pode enviar o formData para o servidor, se necessário
    fetch('http://localhost:8080/produtos', {
        method: 'POST',
        body: produtoDTO
    })
    .then(response => response.json())
    .then(data => {
        console.log('Produto cadastrado:', data);
        // Aqui você pode atualizar o grid de produtos
    })
    .catch(error => console.error('Erro ao cadastrar produto:', error));
});