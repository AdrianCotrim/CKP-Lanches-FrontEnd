// Modal
var funcionarios = document.getElementById('funcionarios')
var modalAltFunc = document.getElementById('editarFunc')

// Exibe modal na tela
funcionarios.addEventListener('click', (event) => {  
      if(event.target.nodeName == 'TD'){
        modalAltFunc.style.display = 'flex'

        var funcionario = event.target.parentNode
        let celulas = Array.from(funcionario.children)

        var nome = celulas[0].textContent;
        var id = celulas[1].textContent;
        var email = celulas[2].textContent;
        
        document.getElementById('nomeAlterar').value = nome;
        document.getElementById('emailAlterar').value = email;
        document.getElementById('id').value = id;
    }   
})

modalAltFunc.addEventListener('click', (event) => {

    // Altera funcionario
    if(event.target.textContent == 'Concluir'){
        modalAltFunc.style.display = 'none'
        const funcionario = {
            username: document.getElementById("nomeAlterar").value,
            usernamePassword: document.getElementById("senhaAlterar").value,
            userEmail: document.getElementById("emailAlterar").value,
            role: document.getElementById("nivelAcessoAlterar").value
        }
        const id = parseInt(document.getElementById('id').value);

        fetch(`http://localhost:8080/userManager/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(funcionario)
        })
        .then(response => {
            console.log(response.json())
            window.location.reload();
    })
        .catch(erro => console.log(erro))
    }

    // Fecha o modal
    if(event.target.textContent == 'Cancelar'){
        modalAltFunc.style.display = 'none'
    }

})