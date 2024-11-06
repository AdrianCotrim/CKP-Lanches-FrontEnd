const modalAlterarProduto = document.getElementById("alterarInsumo");
const produtos = document.getElementById("cardapio");
let produtoElement = null;
let produtoObject = {
    productName: "",
    productValue: 0,
    description: "",
    supplieNames: ["Hambuguer", "Mirtilo"],
    category: ""
};


// Adiciona a lista de insumos incluidos no produto
var insumosLista_alterar = document.getElementById("insumos-alterar");
const listaInsumos_alterar = document.getElementById("listaInsumos-alterar");
let insumos_alterar = [];

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

        dados.forEach(element => {
            let option = document.createElement("p");
            let addInsumo = document.createElement('i')
            addInsumo.classList.add('fas');
            addInsumo.classList.add('fa-plus');
            addInsumo.classList.add('novoInsumo');
            option.value = element.name;
            option.textContent = element.name;
            option.appendChild(addInsumo)
            insumosLista_alterar.appendChild(option)
            addInsumo.addEventListener('click', (event) => {
                let novoInsumo = document.createElement("li");
                novoInsumo.classList.add("ms-1");
                let removerInsumo = document.createElement("i");
                let p = event.target.parentNode;
                removerInsumo.classList.add("fa");
                removerInsumo.classList.add("fa-times");
                removerInsumo.id = `excluir-${p.value}`


                if (!insumos_alterar.some((insumo) => { return insumo === p.value })) {
                    novoInsumo.textContent = p.value;
                    novoInsumo.appendChild(removerInsumo);
                    listaInsumos_alterar.appendChild(novoInsumo);
                    insumos_alterar.push(p.value)
                }


                removerInsumo.addEventListener('click', () => {
                    listaInsumos_alterar.removeChild(novoInsumo);
                    insumos_alterar = insumos_alterar.filter(insumo => insumo !== novoInsumo.textContent)
                });
                console.log(insumos_alterar);
            });
        });
    })
    .catch(erro => console.log(erro))



produtos.addEventListener("click", (event) => {
    if (event.target.parentNode.parentNode.classList.contains("produto")) {
        modalAlterarProduto.style.display = "flex";
        produtoElement = event.target.parentNode.parentNode;
        const produtoNome = produtoElement.querySelector(".produtoNome").textContent;

        fetch("http://localhost:8080/produtos", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(dados => {
                dados.forEach(produto => {
                    if (produto.product_name == produtoNome) {
                        produtoObject.productName = produto.product_name;
                        produtoObject.description = produto.description;
                        produtoObject.productValue = produto.product_value;
                        produtoObject.category = produto.category;
                        


                        produto.supplies.forEach((supplie) => {
                            let novoInsumo = document.createElement("li");
                            novoInsumo.classList.add("ms-1");
                            let removerInsumo = document.createElement("i");
                            novoInsumo.textContent = supplie.name;
                            removerInsumo.classList.add("fa");
                            removerInsumo.classList.add("fa-times");
                            removerInsumo.id = `excluir-${novoInsumo.textContent}`
                            console.log(novoInsumo.textContent)


                            if (!insumos_alterar.some((insumo) => { return insumo === novoInsumo.value })) {
                                novoInsumo.appendChild(removerInsumo);
                                listaInsumos_alterar.appendChild(novoInsumo);
                                insumos_alterar.push(novoInsumo.textContent)
                            }


                            removerInsumo.addEventListener('click', () => {
                                listaInsumos_alterar.removeChild(novoInsumo);
                                insumos_alterar = insumos_alterar.filter(insumo => insumo !== novoInsumo.textContent)
                            });
                            console.log(insumos_alterar);
                        });

                        produtoObject.supplieNames = insumos_alterar;
                        
                        document.getElementById("id-produto-alterar").value = produto.product_id;
                        document.getElementById("nomeAlterar").value = produto.product_name;
                        document.getElementById("descricaoAlterar").value = produto.description;
                        document.getElementById("valorAlterar").value = "R$ " + formatNumber(produto.product_value);
                        console.log(document.getElementById("valorAlterar").value);
                        document.getElementById("categoriaAlterar").value = produto.category;
                    }
                })
            })
            .catch(erro => console.error(erro))
        
    }
})

modalAlterarProduto.addEventListener("click", (event) => {
    if (event.target.textContent == "Concluir") {
        const id = document.getElementById("id-produto-alterar").value;
        produtoObject.productName = document.getElementById("nomeAlterar").value;
        produtoObject.description = document.getElementById("descricaoAlterar").value;
        const value = (document.getElementById('valorAlterar').value);
        const valor = value.replace(/[^\d,]/g, '');
        const valorReal = parseFloat(valor.replace(',', '.'));
        produtoObject.productValue = valorReal;
        produtoObject.category = document.getElementById("categoriaAlterar").value;
        console.log(produtoObject);
        console.log(document.getElementById("imagemAlterar").files[0]);
        
        // Criando o FormData e garantindo o envio correto de produtoObject como JSON
        const formData = new FormData();
        formData.append("produto", new Blob([JSON.stringify(produtoObject)], { type: "application/json" }));
        formData.append("imagem", document.getElementById("imagemAlterar").files[0]);


        fetch(`http://localhost:8080/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`  // Adiciona o token de autorização
            },
            body: formData  // O corpo agora é o FormData com o JSON e a imagem
        })
        .then(response => {
            if (!response.ok) {
                // Se o status não for OK, lança um erro com o texto da resposta
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();  // Converte a resposta para JSON se for bem-sucedida
        })
        .then(data => {
            console.log('Produto atualizado:', data);
            // Atualizar o grid de produtos, ou realizar alguma ação adicional
        })
        .catch(error => {
            console.error('Erro ao atualizar produto:', error.message);
        });


        
        document.getElementById("nomeAlterar").value = "";
        document.getElementById("descricaoAlterar").value = "";
        document.getElementById("valorAlterar").value = "";
        document.getElementById("categoriaAlterar").value = "";
        produtoElement = null;

        modalAlterarProduto.style.display = "none";
    }
    if (event.target.textContent == "Cancelar") {
        // document.getElementById("nomeAlterar").value = "";
        // document.getElementById("descricaoAlterar").value = "";
        // document.getElementById("valorAlterar").value = "";
        // document.getElementById("categoriaAlterar").value = "";
        // produtoElement = null;
        // produtoObject = null;
        insumos_alterar = [];
        listaInsumos_alterar.innerHTML = "";

        modalAlterarProduto.style.display = "none";
    }
})