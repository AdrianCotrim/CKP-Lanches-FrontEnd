const token = localStorage.getItem('authToken');

// Traz usuários do banco
fetch("http://localhost:8080/user", {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(dados => {
    console.log(dados)
    var usuarios = document.getElementById("funcionarios")
    var tbody = usuarios.querySelector("tbody")

    dados.forEach(element => {
        var tr = document.createElement("tr")
        tr.innerHTML = `<td>${element.username}</td>
        <td>${element.id}</td>
        <td>${element.userEmail}</td>
        <td>${element.role}</td>`
        tr.classList.add("linha");
        tbody.appendChild(tr)
    });  
})
.catch(erro => console.log(erro))

