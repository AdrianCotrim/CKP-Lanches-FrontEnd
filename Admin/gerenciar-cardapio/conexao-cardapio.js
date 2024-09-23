const token = localStorage.getItem('authToken');

// Traz produtos do banco
fetch("http://localhost:8080/products", {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(dados => {
    console.log(dados)
    var cardapio = document.getElementById("cardapio")

    dados.forEach(element => {
        var div = document.createElement("div")
        div.innerHTML = `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSU7lS-9pXVRVRzCu80X0ynHGF7C0AAXoTOQ&s" class="mt-3"> 
        <h2 class="mt-3">${element.name}</h2>
        <p class="mt-1">${element.description}</p>
        <h3 class="align-items-right">${element.price}</h3>`
        cardapio.appendChild(div)
    });  
})
.catch(erro => console.log(erro))

