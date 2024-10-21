const token = localStorage.getItem('authToken');

fetch("http://localhost:8080/pedidos/finalizados", {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(dados => {
    console.log(dados)
    var vendas = document.getElementById("vendas")
    var tbody = pedidos.querySelector("tbody")

    dados.forEach(element => {
        var tr = document.createElement("tr")
        tr.innerHTML = `<td>${element.orderId}</td>
        <td>21/10/2024</td>
        <td>${element.exitMethod}</td>
        <td>${element.paymentMethod}</td>
        <td>${element.totalValue == null ? "$00,00": element.totalValue}</td>`
        tr.classList.add("linha");
        tbody.appendChild(tr)
    });  
})
.catch(erro => console.log(erro))

