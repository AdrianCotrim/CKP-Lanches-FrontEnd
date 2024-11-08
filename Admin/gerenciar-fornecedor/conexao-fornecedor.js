const listaFornecedor = document.getElementById("lista-fornecedor");
const infoornecedor = document.getElementById('infoFornecedor');
const id = document.getElementById('id_fornecedor');
const nome = document.getElementById('nome-fantasia');
const cnpj = document.getElementById('cnpj');
const social = document.getElementById('razao-social');
const endereco = document.getElementById('endereco');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');


var limparFornecedores = () => {
    listaFornecedor.innerHTML = "";
}

var listaFornecedores = async () => {
    const response = await fetch('http://localhost:8080/fornecedores', {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        method: 'GET'
    });

    if(!response.ok){
        const erro = await response.text();
        throw new Error(erro)
    }

    const data = await response.json();


    data.forEach(fornecedor => {
        const divPai = document.createElement('div');
        divPai.classList.add("fornecedor", "mt-3", "me-2", "ms-2", "mb-1");
        const div = document.createElement('div');
        div.classList.add("info-fornecedor");
        div.innerHTML = 
            `<p>${fornecedor.name}</p>
            <label class="telefone pe-5">${fornecedor.telefone}</label>
            <label class="valor">ID: ${fornecedor.id}</label>`;
        divPai.appendChild(div);
        listaFornecedor.appendChild(divPai);

        divPai.addEventListener('click', () => {
            document.getElementById("cadastrarFornecedor").style.display = 'none';
            infoornecedor.style.display = 'flex';
            id.textContent = fornecedor.id
            nome.textContent = fornecedor.name;
            cnpj.textContent = fornecedor.cnpj;
            social.textContent = fornecedor.social;
            endereco.textContent = fornecedor.address;
            email.textContent = fornecedor.email;
            telefone.textContent = fornecedor.telefone;
        })
    });
    

    
}

listaFornecedores();