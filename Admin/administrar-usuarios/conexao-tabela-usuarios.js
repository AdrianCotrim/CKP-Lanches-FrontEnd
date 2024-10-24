const token = localStorage.getItem('authToken');

document.addEventListener('DOMContentLoaded', () => {
    getName()
  })
  
  async function getName() {
    const usuarioLabel = document.getElementById('usuario');
  
    try{
  
      const response = await fetch("http://localhost:8080/user/name", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      usuarioLabel.textContent = data.username;
  
    } catch(erro){
      console.error(erro);
    }
  }

// Traz usuários do banco
fetch("http://localhost:8080/userManager", {
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
        <td>${element.userId}</td>
        <td>${element.userEmail}</td>
        <td>${element.role}</td>
        <td>${element.status}`
        tr.classList.add("linha");
        tbody.appendChild(tr)
    });  
})
.catch(erro => console.log(erro))

