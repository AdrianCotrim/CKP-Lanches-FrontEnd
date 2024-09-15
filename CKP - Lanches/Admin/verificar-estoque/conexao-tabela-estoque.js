const token = localStorage.getItem('authToken');

// Traz insumos do banco
fetch("http://localhost:8080/insumos", {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(dados => {
    console.log(dados)
    var estoque = document.getElementById("estoque")
    var tbody = estoque.querySelector("tbody")

    dados.forEach(element => {
        var tr = document.createElement("tr")
        tr.innerHTML = `<td>${element.name}</td>
        <td>${element.id}</td>
        <td>${element.description}</td>
        <td>${element.minQuantity}</td>
        <td>${element.maxQuantity}</td>
        <td>${element.quantity}</td>
        <td>${element.experation_date}</td>`
        tr.classList.add("linha");
        tbody.appendChild(tr)
    });  
})
.catch(erro => console.log(erro))

