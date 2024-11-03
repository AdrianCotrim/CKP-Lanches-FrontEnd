document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector("button")
    const formulario = document.querySelector("#loginForm");
    const Inome = document.querySelector("#username");
    const Isenha = document.querySelector("#userPassword");

    async function logar() {
        try {
            // Faz a solicitação de login
            const response = await fetch("http://localhost:8080/auth/login", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    username: Inome.value,
                    userPassword: Isenha.value
                })
            });

            

            if (!response.ok) {

                const erro = await response.text();

                console.log(erro);

                if(response.status == 404) throw new Error("Usuário não cadastrado!")
                
                throw new Error(erro)
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);

            // Imprime o token no console
            console.log('Token recebido:', data.token);

            // Obtém a role do usuário
            const userRole = await fetchUserRole();
            console.log('Role do usuário:', userRole);

            // Redireciona com base na role do usuário
            if (userRole === 'ADMIN') {
                window.location.href = "/Admin/Tela-inicial/inicio.html";
            } else if (userRole === 'USER') {
                window.location.href = "/Usuario/Tela inicial/inicio.html";
            } else {
                const mensagemLabel = document.getElementById("mensagem-erro");
                mensagemLabel.textContent = erro;
            }
        } catch (error) {
                const mensagemLabel = document.getElementById("mensagem-erro");
                const erro = error.toString().split("Error: ");
                console.log(erro[1]);
                mensagemLabel.textContent = erro[1];
        }
    }

    async function fetchUserRole() {
        const token = localStorage.getItem('authToken');
        console.log('Token usado para obter role:', token); // Imprime o token usado para obter a role

        try {
            const response = await fetch("http://localhost:8080/user/role", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter role do usuário');
            }

            const data = await response.json();
            console.log('Role recebida da API:', data.role); // Imprime a role recebida no console
            return data.role;
        } catch (error) {
            console.error('Erro ao obter role do usuário:', error);
            return null;
        }
    }

    document.getElementById('username').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('botao').click();
        }
    });

    document.getElementById('userPassword').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('botao').click();
        }
    });

    button.addEventListener('click', function() {
        logar();
    });
});

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';
});