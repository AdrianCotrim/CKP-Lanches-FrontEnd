const buttonAlterarFornecedor = document.getElementById('button-alterar');
const nome_input_alterar = document.getElementById('nome-fantasia-input-alterar');
const cnpj_input_alterar = document.getElementById('cnpjAltera');
const social_input_alterar = document.getElementById('razao-social-input-alterar');
const endereco_input_alterar = document.getElementById('endereco-input-alterar');
const email_input_alterar = document.getElementById('email-input-alterar');
const telefone_input_alterar = document.getElementById('telefoneAltera');


buttonAlterarFornecedor.addEventListener('click', async () => {

    let supplieDTO = {
        name: nome_input_alterar.value,
        email: email_input_alterar.value,
        cnpj: cnpj_input_alterar.value,
        social: social_input_alterar.value,
        address: endereco_input_alterar.value,
        telefone: telefone_input_alterar.value
    }

    try {

        const response = await fetch(`http://localhost:8080/fornecedores/${id.textContent}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            method: 'PUT',
            body: JSON.stringify(supplieDTO)
        });

        if(!response.ok){
            const erro = await response.text();
            throw new Error(erro);
        }

        const data = await response.json();

        console.log("Fornecedor atualizado: ");
        console.log(data);

        limparFornecedores();
        listaFornecedores();

        buttonAlterarFornecedor.value = "";
        nome_input_alterar.value = "";
        cnpj_input_alterar.value = "";
        social_input_alterar.value = "";
        endereco_input_alterar.value = "";
        email_input_alterar.value = "";
        telefone_input_alterar.value = "";
        modalAltera.style.display = "none";
        info.style.display = "none";
        
        
    } catch (error) {
        console.log(error);
    }
});