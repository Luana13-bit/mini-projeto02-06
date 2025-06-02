class Produto {
  constructor(nome, descricao, valor, imagem) {
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
    this.imagem = imagem;
  }
}

const botaoAdicionar = document.getElementById('botao-add');
const nome = document.getElementById('input-nome');
const descricao = document.getElementById('input-descricao');
const valor = document.getElementById('input-valor');
const imagem = document.getElementById('image-select');
const containerProdutos = document.getElementById('container-peças');

let listaProdutos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarNoLocalStorage() {
  localStorage.setItem("produtos", JSON.stringify(listaProdutos));
}

function renderizarProdutos() {
  containerProdutos.innerHTML = '';

  listaProdutos.forEach((peça, index) => {
    const item = document.createElement("div");
    item.classList.add("cards-peças");
    item.innerHTML = `
      <p><strong>Nome:</strong> ${peça.nome}</p>
      <p><strong>Descrição:</strong> ${peça.descricao}</p>
      <p><strong>Valor:</strong> R$ ${parseFloat(peça.valor).toFixed(2).replace(".", ",")}</p>
      <img src="${peça.imagem}" alt="${peça.nome}">
      <span>
        <button onclick="excluirProduto(${index})">Excluir</button>
      </span>
    `;
    containerProdutos.appendChild(item);
  });
}

function adicionarPeça(event) {
  event.preventDefault();

  if (!nome.value || !descricao.value || !valor.value || !imagem.value) {
    alert("Preencha todos os campos!");
    return;
  }

  const novaPeça = new Produto(nome.value, descricao.value, valor.value, imagem.value);

  listaProdutos.push(novaPeça);
  salvarNoLocalStorage();
  renderizarProdutos();

  nome.value = '';
  descricao.value = '';
  valor.value = '';
  imagem.value = '';
}

function excluirProduto(index) {
  listaProdutos.splice(index, 1);
  salvarNoLocalStorage();
  renderizarProdutos();
}

botaoAdicionar.addEventListener('click', adicionarPeça);

// Renderiza ao carregar a página
renderizarProdutos();
