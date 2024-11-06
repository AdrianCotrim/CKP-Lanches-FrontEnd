const token = localStorage.getItem('authToken');


var getVerificarEstoque = () => {
    // Traz insumos do banco
    fetch("http://localhost:8080/insumos", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(dados => {
        console.log(dados)
        var estoque = document.getElementById("estoque")
        var tbody = estoque.querySelector("tbody")

        dados.forEach(element => {
            fetch(`http://localhost:8080/lots/lot?supplyId=${element.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
        
                // Cria o select
                let select = document.createElement('select');
        
                // Cria a linha da tabela
                var tr = document.createElement("tr");
                tr.innerHTML = `<td>${element.name}</td>
                                <td>${element.id}</td>
                                <td>${element.description}</td>
                                <td>${element.minQuantity}</td>
                                <td>${element.maxQuantity}</td>
                                <td id="quantidadeTD_${element.id}">${element.quantity}</td>`;
        
                // Opção padrão do select
                let optionDefault = document.createElement('option');
                optionDefault.textContent = "Datas de validade";
                optionDefault.value = "";  // Valor vazio para a opção padrão
                select.appendChild(optionDefault);
        
                // Adiciona as opções no select
                data.forEach(lot => {
                    let option = document.createElement('option');
                    option.value = lot.id;
                    option.textContent = lot.expirationDate;
                    select.appendChild(option);
                });
        
                // Adiciona o select à linha
                let td = document.createElement('td');
                td.appendChild(select);
                tr.appendChild(td);
        
                // Evento change no select para capturar a mudança de opção
                select.addEventListener('change', (event) => {
                    let quantidade = 0;
                    const selectedOptionText = event.target.options[event.target.selectedIndex].textContent;
        
                    if (selectedOptionText === "Datas de validade") {
                        // Se a opção padrão for selecionada, volta a quantidade original do produto
                        document.getElementById(`quantidadeTD_${element.id}`).textContent = element.quantity; 
                    } else {
                        // Filtra os lotes pela data de validade selecionada
                        const filteredLots = data.filter(lot => lot.expirationDate === selectedOptionText);
                        filteredLots.forEach(lot => {
                            quantidade += lot.quantity;  // Soma a quantidade dos lotes filtrados
                        });
        
                        // Atualiza a célula de quantidade com a quantidade filtrada
                        document.getElementById(`quantidadeTD_${element.id}`).textContent = quantidade;
                    }
                });
        
                // Adiciona a linha à tabela
                tr.classList.add("linha");
                tbody.appendChild(tr);
            })
            .catch(error => console.error('Erro ao buscar os lotes:', error));
        });
        
    })
    .catch(erro => console.log(erro))
}

function limparEstoqueTabela(){
    document.querySelector('#estoque tbody').innerHTML = '';
}

getVerificarEstoque();
