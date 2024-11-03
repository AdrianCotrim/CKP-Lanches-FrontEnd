let btnAlteraProduto = document.getElementById("confirmarAlteraProduto");

let btnFecharAlteraProduto = document.getElementById("cancelarAltera");
let modalAlteraProd = document.getElementById("alterarProd");
const cardapio = document.getElementById("cardapio");

btnFecharAlteraProduto.addEventListener("click", function () {
    modalAlteraProd.style.display = "none";
})

btnAlteraProduto.addEventListener('click', function (event) {
    event.preventDefault();  // Prevenir o comportamento padrão do formulário, se houver
    console.log("teste")
    fetch("http://localhost:8080/insumos", {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
            'Accept': 'application/json'
        },
        method: 'GET'
    })
        .then(response => response.json())
        .then(dados => {
            let insumosIds = [];

            dados.forEach(element => {
                insumos.forEach(insumo => {
                    if (insumo == element.name) {

                        insumosIds.push(element.id)
                    }
                })
            })
        })
        .catch(erro => console.log(erro))

    // Pegando os valores do formulário

    const value = (document.getElementById('alteraValor').value);
    const valor = value.replace(/[^\d,]/g, '');
    const valorReal = parseFloat(valor.replace(',', '.'));


    const produtoDTO = {
        productName: document.getElementById('alteraNome').value,
        productValue: valorReal,
        description: document.getElementById('alteraDesc').value,
        supplieNames: insumos,
        category: document.getElementById('alteraCateg').value
    };

    // Criando o FormData
    const formData = new FormData();
    formData.append("produtoDTO", new Blob([JSON.stringify(produtoDTO)], { type: "application/json" }));  // Adiciona os dados do produto como JSON
    formData.append("imagem", document.getElementById('alteraImg').files[0]);  // Adiciona a imagem do input 'file'

    // Enviando a requisição PUT
    fetch(`http://localhost:8080/produtos/${idProdAlterar}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`  // Adiciona o token de autorização
        },
        body: formData  // O corpo agora é o FormData com o JSON e a imagem
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto alterado:', data);
            // Atualizar o grid de produtos, ou realizar alguma ação adicional
        })
        .catch(error => console.error('Erro ao alterar produto:', error));

    //location.reload();
});

// Adiciona a lista de insumos incluidos no produto
var selectInsumos = document.getElementById("alteraInsumos");
var listaInsumos = document.getElementById("listaAlteraInsumos");
let alteraInsumos = [];

// Traz os insumos para o select

fetch("http://localhost:8080/insumos", {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
        'Accept': 'application/json'
    },
})
    .then(response => response.json())
    .then(dados => {
        console.log(dados)
        let insumoslista = document.getElementById("alteraInsumos")

        dados.forEach(element => {
            let option = document.createElement("p");
            let addInsumo = document.createElement('i')
            addInsumo.classList.add('fas');
            addInsumo.classList.add('fa-plus');
            addInsumo.classList.add('novoInsumo');
            option.value = element.name;
            option.textContent = element.name;
            option.appendChild(addInsumo)
            insumoslista.appendChild(option)
            addInsumo.addEventListener('click', (event) => {
                let novoInsumo = document.createElement("li");
                novoInsumo.classList.add("ms-1");
                let removerInsumo = document.createElement("i");
                let p = event.target.parentNode;
                removerInsumo.classList.add("fa");
                removerInsumo.classList.add("fa-times");
                removerInsumo.id = `excluir-${p.value}`


                if (!alteraInsumos.some((insumo) => { return insumo === p.value })) {
                    novoInsumo.textContent = p.value;
                    novoInsumo.appendChild(removerInsumo);
                    listaInsumos.appendChild(novoInsumo);
                    alteraInsumos.push(p.value)
                }


                removerInsumo.addEventListener('click', () => {
                    listaInsumos.removeChild(novoInsumo);
                    alteraInsumos = alteraInsumos.filter(insumo => insumo !== novoInsumo.textContent)
                });
                console.log(alteraInsumos);
            });
        });
    })
    .catch(erro => console.log(erro))


selectInsumos.addEventListener("change", function () {
    if (this.value !== "Insumos") {

    }
})

const adicionarInsumo = document.querySelectorAll('.novoInsumo');
const listaAdicionados = document.getElementById('listaInsumos');

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const produto = button.parentElement.querySelector('span').textContent;

        // Cria um novo elemento para a lista de adicionados
        const novoProduto = document.createElement('div');
        novoProduto.textContent = produto;
        novoProduto.classList.add('adicionado');

        // Adiciona o novo produto à lista de adicionados
        listaAdicionados.appendChild(novoProduto);
    });
});