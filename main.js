// Aguarda o DOM estar totalmente carregado para garantir a manipulação dos elementos
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleção dos elementos do formulário e áreas de feedback
    const form = document.getElementById("registration-form");
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    
    const nameError = document.getElementById("name-error");
    const ageError = document.getElementById("age-error");
    const feedbackMessage = document.getElementById("feedback-message");

    // Escuta o evento de envio (submit) do formulário
    form.addEventListener("submit", (event) => {
        // Impede o comportamento padrão de recarregar a página
        event.preventDefault();

        // Limpa os estados de erro anteriores antes de rodar a nova validação
        clearErrors();

        // Armazena e remove espaços em branco extras dos inputs
        const nameValue = nameInput.value.trim();
        const ageValue = parseInt(ageInput.value, 10);
        
        let isFormValid = true;

        /* ==========================================
           VALIDAÇÃO: Campo Nome (Mínimo 3 caracteres)
           ========================================== */
        if (nameValue === "") {
            showInputError(nameInput, nameError, "O campo nome é obrigatório.");
            isFormValid = false;
        } else if (nameValue.length < 3) {
            showInputError(nameInput, nameError, "O nome deve conter pelo menos 3 caracteres.");
            isFormValid = false;
        }

        /* ==========================================
           VALIDAÇÃO: Campo Idade (Entre 14 e 19 anos)
           ========================================== */
        if (isNaN(ageValue)) {
            showInputError(ageInput, ageError, "O campo idade é obrigatório e deve ser um número.");
            isFormValid = false;
        } else if (ageValue < 14 || ageValue > 19) {
            showInputError(ageInput, ageError, "A idade permitida deve ser entre 14 e 19 anos.");
            isFormValid = false;
        }

        /* ==========================================
           PROCESSAMENTO FINAL DO FEEDBACK
           ========================================== */
        if (isFormValid) {
            // Exibe banner de Sucesso
            showFeedback("Inscrição enviada com sucesso! Seja bem-vindo.", "success");
            // Limpa o formulário após o sucesso
            form.reset();
        } else {
            // Exibe banner de Erro Geral
            showFeedback("Por favor, corrija os erros destacados no formulário.", "error-banner");
        }
    });

    /**
     * Aplica os estilos de erro visuais e preenche o texto do aria-describedby
     */
    function showInputError(inputElement, errorElement, errorMessage) {
        inputElement.style.borderColor = "#e53e3e"; // Borda vermelha indicativa
        errorElement.textContent = errorMessage; // Adiciona o texto do erro
    }

    /**
     * Exibe a mensagem de feedback principal (Sucesso ou Falha) na parte superior do form
     */
    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `message ${type}`; // Aplica a classe correspondente (success ou error-banner)
    }

    /**
     * Reseta as bordas, limpa as mensagens de ajuda e esconde o banner superior
     */
    function clearErrors() {
        nameInput.style.borderColor = "";
        ageInput.style.borderColor = "";
        nameError.textContent = "";
        ageError.textContent = "";
        feedbackMessage.textContent = "";
        feedbackMessage.className = "message";
    }
});
