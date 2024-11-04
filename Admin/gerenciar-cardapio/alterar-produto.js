const modalAlterarProduto = document.getElementById("alterarInsumo");
const produtos = document.getElementById("cardapio");
let produtoElement = null;
const produtoObject = {
    productName: "",
    productValue: 0,
    description: "",
    supplieNames: null,
    category: ""
};

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
                        produtoObject.supplieNames = produto.supplies;
                        
                        document.getElementById("nomeAlterar").value = produto.product_name;
                        document.getElementById("descricaoAlterar").value = produto.description;
                        document.getElementById("valorAlterar").value = produto.product_value;
                        document.getElementById("categoriaAlterar").value = produto.category;
                    }
                })
            })
            .catch(erro => console.error(erro))
        
    }
})

modalAlterarProduto.addEventListener("click", (event) => {
    if (event.target.textContent == "Concluir") {
        produtoObject.productName = document.getElementById("nomeAlterar").value;
        produtoObject.description = document.getElementById("descricaoAlterar").value;
        produtoObject.productValue = parseInt(document.getElementById("valorAlterar").value);
        produtoObject.category = document.getElementById("categoriaAlterar").value ;
        console.log(produtoObject);
        console.log(document.getElementById("imagemAlterar").value);
        
        // Criando o FormData
        const formData = new FormData();
        formData.append("produtoObject", new Blob([JSON.stringify(produtoObject)], { type: "application/json" }));
        formData.append("imagem", document.getElementById('imagemAlterar').files[0]);  // Adiciona a imagem do input 'file'

        fetch(`http://localhost:8080/produtos/${produtoObject.product_id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`  // Adiciona o token de autorização
        },
        body: formData  // O corpo agora é o FormData com o JSON e a imagem
        })
        .then(response => response.json())
        .then(data => {
            console.log('Produto cadastrado:', data);
            // Atualizar o grid de produtos, ou realizar alguma ação adicional
        })
        .catch(error => console.error('Erro ao cadastrar produto:', error));
        
        document.getElementById("nomeAlterar").value = "";
        document.getElementById("descricaoAlterar").value = "";
        document.getElementById("valorAlterar").value = "";
        document.getElementById("categoriaAlterar").value = "";
        produtoElement = null;

        modalAlterarProduto.style.display = "none";
    }
    if (event.target.textContent == "Cancelar") {
        document.getElementById("nomeAlterar").value = "";
        document.getElementById("descricaoAlterar").value = "";
        document.getElementById("valorAlterar").value = "";
        document.getElementById("categoriaAlterar").value = "";
        produtoElement = null;
        produtoObject = null;

        modalAlterarProduto.style.display = "none";
    }
})