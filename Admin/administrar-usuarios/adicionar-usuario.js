// Modal
var modalAddFunc = document.getElementById("adicionarFunc")
var btnAdd = document.getElementById("addFunc")


// Exibe modal na tela
btnAdd.addEventListener("click", function() {
    modalAddFunc.style.display = "flex"
    document.getElementById('erro-confirmaSenha').style.display = "none";
})

modalAddFunc.addEventListener('click', (event) => {
    console.log(event.target.textContent)
    
    // Adiciona o usuário ao banco
    if(event.target.textContent == 'Concluir'){

        const usuario = {
            username: document.getElementById("nome").value,
            userPassword: document.getElementById("senha").value,
            userEmail: document.getElementById("email").value,
            role: document.getElementById("nivelAcesso").value,
            status: "ATIVO",
            statusConta: "ATIVO"
        }
        console.log(usuario)

        let userPassword = document.getElementById("senha").value;
        let userPasswordConfirm = document.getElementById("senhaConfirma").value;
        if(userPassword != userPasswordConfirm) {
            const mensagemErroConfirmarSenha = "A senhas devem ser iguais!";
            document.getElementById('erro-confirmaSenha').style.display = "block";
            document.getElementById('erro-confirmaSenha').textContent = mensagemErroConfirmarSenha;
            throw new Error(mensagemErroConfirmarSenha);
        }

        modalAddFunc.style.display = 'none'
        
        fetch("http://localhost:8080/userManager", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify(usuario)
        })
        .then(response =>{
            window.location.reload();
            return response.json();
        })
        .then(data => console.log(data))
        .catch(erro => console.log(erro))
    }

    // Fecha o modal
    if(event.target.textContent == 'Cancelar'){
        modalAddFunc.style.display = 'none'
    }
})