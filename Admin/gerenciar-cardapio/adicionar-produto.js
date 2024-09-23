var btnAdd = document.getElementById("addInsumo")
const cardapio = document.getElementById("cardapio")

btnAdd.addEventListener("click", function(){
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