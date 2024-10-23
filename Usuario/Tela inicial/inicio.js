document.addEventListener('DOMContentLoaded', () => {
  iniciar();
})



async function iniciar() {
  try {
    // Faz a solicitação de login
    const response = await fetch("http://localhost:8080/user/name", {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        },
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      window.location.href = "/Tela-de-login/index.html"
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Obtém a hora atual
    const agora = new Date();
    const hora = agora.getHours();

    // Determina a saudação usando operador ternário
    const saudacao = hora < 12 ? 'Bom dia' :
                    (hora < 18 ? 'Boa tarde' : 'Boa noite');

    // Obtém o nome do usuário da resposta
    const username = data.username; // Acessa o nome do usuário da resposta JSON

    // Cria a mensagem de boas-vindas
    const message = `${saudacao}, ${username}!`;

    // Atualiza o conteúdo do elemento com o ID "welcome"
    const welcome = document.getElementById("welcome");
    welcome.textContent = message;
  }
  catch (erro) {
    console.error('Erro:', erro);
  }
}




// IMAGENS

const imagens = [
  'Imagens/img1.png',
  'Imagens/img2.png',
  'Imagens/img3.png',
  'Imagens/img4.png',
]

let index = 0;
const slideshow = document.getElementById('slideshow');
slideshow.src = imagens[index]

function mudaImagem() {
  slideshow.src = imagens[index]
  
  if(index == 2){
    index = 0
  }
  else{
    index += 1;
  }
}