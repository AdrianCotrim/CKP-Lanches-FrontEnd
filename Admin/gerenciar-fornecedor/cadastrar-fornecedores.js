const btnCadastrarFornecedor = document.getElementById('cadastrar-button');
const nome_input = document.getElementById('nome-fantasia-input');
const cnpj_input = document.getElementById('cnpjCadastro');
const social_input = document.getElementById('razao-social-input');
const endereco_input = document.getElementById('endereco-input');
const email_input = document.getElementById('email-input');
const telefone_input = document.getElementById('telefoneCadastro');



btnCadastrarFornecedor.addEventListener('click', async () => {
    let supplieDTO = {
        name: nome_input.value,
        email: email_input.value,
        cnpj: cnpj_input.value,
        social: social_input.value,
        address: endereco_input.value,
        telefone: telefone_input.value
    }

    try {

        const response = await fetch('http://localhost:8080/fornecedores', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            method: 'POST',
            body: JSON.stringify(supplieDTO)
        });

        if(!response.ok){
            const erro = await response.text();
            throw new Error(erro);
        }

        const data = await response.json();

        console.log("Fornecedor adicionado: ");
        console.log(data);

        limparFornecedores();
        listaFornecedores();
        
        
    } catch (error) {
        console.log(error);
    }
});