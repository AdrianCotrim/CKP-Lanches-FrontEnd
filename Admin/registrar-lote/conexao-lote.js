const token = localStorage.getItem('authToken');

fetch("http://localhost:8080/lots", {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(dados => {
    console.log(dados)
    var lotes = document.getElementById("lotes")
    var tbody = lotes.querySelector("tbody")

    dados.forEach(element => {
        var tr = document.createElement("tr")
        tr.innerHTML = `<td>${element.id}</td>
        <td>${element.expirationDate}</td>
        <td>${element.quantity}</td>
        <td>${element.supplierTableDTO.id}</td>
        <td>${element.supplyTableDTO.id}</td>
        <td>R$${element.value}</td>`
        tr.classList.add("linha");
        tbody.appendChild(tr)
    });  
})
.catch(erro => console.log(erro))
