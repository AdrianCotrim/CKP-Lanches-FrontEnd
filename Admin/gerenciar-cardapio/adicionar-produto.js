let btnAddProduto = document.getElementById("confirmarAddProduto");
let addProdutoModal = document.getElementById("adicionarInsumo");

btnAddProduto.addEventListener('click', function (event) {
    if (insumos.length > 0 && document.getElementById('nome').value && document.getElementById('valor').value) {
        event.preventDefault();  // Prevenir o comportamento padrão do formulário, se houver
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
        console.log(insumos);

        const value = (document.getElementById('valor').value);
        const valor = value.replace(/[^\d,]/g, '');
        const valorReal = parseFloat(valor.replace(',', '.'));
        const produtoDTO = {
            productName: document.getElementById('nome').value,
            productValue: valorReal,
            description: document.getElementById('descricao').value,
            supplieNames: insumos,
            category: document.getElementById('categoria').value
        };

        async function enviarProduto() {
            // Criando o FormData
            const formData = new FormData();
            const placeholder = 'placeholder.png';
            formData.append("produtoDTO", new Blob([JSON.stringify(produtoDTO)], { type: "application/json" }));  // Adiciona os dados do produto como JSON

            // Verifica se o usuário escolheu uma imagem
            if (document.getElementById('imagem').files[0]) {
                formData.append("imagem", document.getElementById('imagem').files[0]); // Adiciona a imagem do input 'file'
                console.log(document.getElementById('imagem').files[0]);
            } else {
                // Carrega a imagem placeholder
                try {
                    const response = await fetch(placeholder);
                    if (!response.ok) {
                        throw new Error("Erro ao carregar a imagem placeholder.");
                    }
                    const blob = await response.blob();
                    const file = new File([blob], "placeholder.png", { type: "image/png" });
                    formData.append("imagem", file);
                } catch (error) {
                    console.error('Erro ao carregar imagem placeholder:', error);
                    return;  // Impede o envio se houver erro ao carregar a imagem
                }
            }

            // Enviando a requisição POST
            try {
                const response = await fetch('http://localhost:8080/produtos', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`  // Adiciona o token de autorização
                    },
                    body: formData  // O corpo agora é o FormData com o JSON e a imagem
                });
                const data = await response.json();
                console.log('Produto cadastrado:', data);
                // Atualizar o grid de produtos ou realizar alguma ação adicional
                limparProdutos();
                getProdutos();
            } catch (error) {
                console.error('Erro ao cadastrar produto:', error);
            }
        }

        // Chama a função para enviar o produto
        enviarProduto();
        addProdutoModal.style.display = 'none';

    }

});

let btnAbrirAddProduto = document.getElementById("addInsumo");
let btnFecharAddProduto = document.getElementById("cancelar");


const cardapio = document.getElementById("cardapio");

btnAbrirAddProduto.addEventListener("click", function () {
    addProdutoModal.style.display = "flex";
})

btnFecharAddProduto.addEventListener("click", function () {
    addProdutoModal.style.display = "none";
})

// Adiciona a lista de insumos incluidos no produto
var selectInsumos = document.getElementById("insumos");
var listaInsumos = document.getElementById("listaInsumos");
var insumos = [];

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
        let insumoslista = document.getElementById("insumos")

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


                if (!insumos.some((insumo) => { return insumo === p.value })) {
                    novoInsumo.textContent = p.value;
                    novoInsumo.appendChild(removerInsumo);
                    listaInsumos.appendChild(novoInsumo);
                    insumos.push(p.value)
                }


                removerInsumo.addEventListener('click', () => {
                    listaInsumos.removeChild(novoInsumo);
                    insumos = insumos.filter(insumo => insumo !== novoInsumo.textContent)
                });
                console.log(insumos);
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
