// Vou criar variáveis para armazenar os elementos HTML;
const inputCep = document.querySelector("#input_cep");
const botaoConsultar = document.querySelector("#botao_consultar");
const resultado = document.querySelector(".resultado");

// Variáveis refentes ao modal;
const modal = document.querySelector(".modal");
const containerModal = document.querySelector(".container_modal");
const botaoFecharModal = document.querySelector(".fechar_modal");

// Funções para abrir e fechar o modal;
function abrirModal() {
  modal.classList.add("mostrar");
  containerModal.classList.add("mostrar");
}

function fecharModal() {
  modal.classList.remove("mostrar");
  containerModal.classList.remove("mostrar");
}

// Agora, vou fazer a chamada da API;

async function consultarCep() {
  const cep = inputCep.value.trim();

  // Vou verificar se o que foi digitado no input é válido;

  if (!/^\d{8}$/.test(cep)) {
    resultado.innerHTML = "Por favor, digite um CEP válido!";
    abrirModal();
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    // Fiz a requisição HTTP
    const response = await fetch(url);

    // Se a requisição não for bem-sucedida, vai dar erro!
    if (!response.ok) {
      throw new Error("Erro ao buscar o CEP.");
    }

    // Agora, vou converter os dados recebidos para JSON;
    const data = await response.json();

    if (data.erro) {
      resultado.innerHTML = "CEP não encontrado!";
    } else {
      resultado.innerHTML = `
            <p><strong>CEP:</strong> ${data.cep}</p>
            <p><strong>Logradouro:</strong> ${data.logradouro}</p>
            <p><strong>Bairro:</strong> ${data.bairro}</p>
            <p><strong>Cidade:</strong> ${data.localidade}</p>
            <p><strong>Estado:</strong> ${data.uf}</p> 
        `;
    }
  } catch (error) {
    resultado.innerHTML = "Ocorreu um erro ao buscar o CEP. Tente novamente!";
    console.error(error);
  }

  inputCep.value = "";

  abrirModal();
}

botaoConsultar.addEventListener("click", consultarCep);
botaoFecharModal.addEventListener("click", fecharModal);
