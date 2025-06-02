
class Produto{
  constructor(nome, descricao, valor, imagem){
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
    this.imagem = imagem;
  }
}

const botaoAdicionar = document.getElementById('botao-add');

botaoAdicionar.addEventListener('click', adicionarPeça);

const nome = document.getElementById('input-nome');
const descricao = document.getElementById('input-descricao');
const valor = document.getElementById('input-valor');
const imagem = document.getElementById('image-select');
const containerProdutos = document.getElementById('container-peças');

const listaProdutos = [];
function adicionarPeça(event){
  event.preventDefault();

  const novaPeça = new Produto(nome.value, descricao.value, valor.value, imagem.value);

  listaProdutos.push(novaPeça);

  containerProdutos.innerHTML = ''; // limpa antes de adicionar

  listaProdutos.forEach((peça) => {
    const item = document.createElement("div");
    item.classList.add("cards-peça");
    item.innerHTML = `
      <p>Nome: ${peça.nome}</p>
      <p>Descrição: ${peça.descricao}</p>
      <p>Valor: R$ ${peça.valor}</p>
      <img src="${peça.imagem}" alt="${peça.nome}">
      <span>
        <button>Editar</button>
        <button>Excluir</button>
      </span>
    `;
    containerProdutos.appendChild(item);
  });

  // Opcional: limpar campos
  nome.value = '';
  descricao.value = '';
  valor.value = '';
  imagem.value = '';
}