document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Credenciais fixas
    const validUsername = 'Mateus Colabone';
    const validPassword = 'senha';

    // Obtém os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica se as credenciais estão corretas
    if (username === validUsername && password === validPassword) {
        // Exibe a animação de carregamento
        document.getElementById('loading').style.display = 'flex';

        // Aguarda alguns segundos e exibe a mensagem de boas-vindas
        setTimeout(function() {
            // Oculta a animação de carregamento
            document.getElementById('loading').style.display = 'none';

            // Exibe a mensagem de boas-vindas
            document.getElementById('welcomeBox').style.display = 'block';

            // Aguarda alguns segundos e redireciona
            setTimeout(function() {
                alert('Login bem-sucedido!');
                window.location.href = 'pdfs.html'; // Altere para a URL da próxima página
            }, 3000); // Aguarda 3 segundos (3000 milissegundos)
        }, 3000); // Aguarda 3 segundos (3000 milissegundos)
    } else {
        // Exibe mensagem de erro
        document.getElementById('errorMessage').style.display = 'block';
    }
});
