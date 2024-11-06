// Modal
let estoqueInsumos = document.getElementById('estoque')
let modalAltInsumo = document.getElementById('alterarInsumo')

// Exibe modal na tela
estoqueInsumos.addEventListener('click', (event) => {
    if (event.target.nodeName == 'TD') {
        modalAltInsumo.style.display = 'flex'

        let insumo = event.target.parentNode
        let celulas = Array.from(insumo.children)

        let nome = celulas[0].textContent;
        let id = celulas[1].textContent;
        let descricao = celulas[2].textContent;
        let qtdMinima = celulas[3].textContent;
        let qtdMaxima = celulas[4].textContent;
        let quantidade = celulas[5].textContent;

        document.getElementById('nomeAlterar').value = nome;
        document.getElementById('id').value = id;
        document.getElementById('descricaoAlterar').value = descricao;
        document.getElementById('qtdMinimaAlterar').value = qtdMinima;
        document.getElementById('qtdMaximaAlterar').value = qtdMaxima;
    }
})

modalAltInsumo.addEventListener('click', (event) => {

    // Altera insumo
    if (event.target.textContent == 'Concluir') {
        
        const insumo = {
            name: document.getElementById("nomeAlterar").value,
            description: document.getElementById("descricaoAlterar").value,
            maxQuantity: parseInt(document.getElementById("qtdMaximaAlterar").value),
            minQuantity: parseInt(document.getElementById("qtdMinimaAlterar").value),
        }
        const id = parseInt(document.getElementById('id').value);



        const form = document.querySelector('#alterarInsumo form')
        const maxQuantity = document.getElementById("qtdMaximaAlterar")
        const minQuantity = document.getElementById("qtdMinimaAlterar")

        if(insumo.name == "" || insumo.name == null) {
            //Mensagem de erro
            const span = document.createElement('span');
            span.textContent = "Você deve colocar o nome do insumo!"
            span.style.color = 'red';
            form.appendChild(span);

            // //Limpar campos
            // maxQuantity.value = null;
            // minQuantity.value = null;

            throw new Error(span.textContent);
        }

        if (insumo.minQuantity >= insumo.maxQuantity) {
            //Mensagem de erro
            const span = document.createElement('span');
            span.textContent = "A quantidade mínima não pode ser maior do que a quantidade máxima!"
            span.style.color = 'red';
            form.appendChild(span);

            // //Limpar campos
            // maxQuantity.value = null;
            // minQuantity.value = null;

            throw new Error("A quantidade mínima não pode ser maior do que a quantidade máxima!");
        }

        modalAltInsumo.style.display = 'none'

        fetch(`http://localhost:8080/insumos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(insumo)
        })
            .then(response => {
                console.log(response.json());
                limparEstoqueTabela();
                getVerificarEstoque();
            })
            .catch(erro => console.log(erro))



        
    }



    // Fecha o modal
    if (event.target.textContent == 'Cancelar') {
        modalAltInsumo.style.display = 'none'
    }

})