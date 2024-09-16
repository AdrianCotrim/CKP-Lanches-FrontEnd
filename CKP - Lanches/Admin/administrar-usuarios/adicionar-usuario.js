// Modal
var modalAddFunc = document.getElementById("adicionarFunc")
var btnAdd = document.getElementById("addFunc")


// Exibe modal na tela
btnAdd.addEventListener("click", function() {
    modalAddFunc.style.display = "flex"
})

modalAddFunc.addEventListener('click', (event) => {
    console.log(event.target.textContent)
    
    // Adiciona o usuário ao banco
    if(event.target.textContent == 'Concluir'){
        modalAddFunc.style.display = 'none'

        const usuario = {
            username: document.getElementById("nome").value,
            usernamePassword: document.getElementById("senha").value,
            userEmail: document.getElementById("email").value,
            role: document.getElementById("nivelAcesso").value
        }
        console.log(usuario)
        
        fetch("http://localhost:8080/user", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify(usuario)
        })
        .then(response =>{
            console.log(response)
            /* window.location.reload() */
    })
        .catch(erro => console.log(erro))
    }

    // Fecha o modal
    if(event.target.textContent == 'Cancelar'){
        modalAddFunc.style.display = 'none'
    }
})