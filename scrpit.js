
import { Storage } from './storage.js';

class Produto {
  constructor(id, nome, descricao, preco, imagem) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.imagem = imagem;
  }
}

let produtos = Storage.get();

function atualizarDados() {
  Storage.set(produtos);
  listarProdutos();
}

function listarProdutos() {
  const lista = document.getElementById('lista-produtos');
  lista.innerHTML = '';
  produtos.forEach(produto => {
    const precoFormatado = parseFloat(produto.preco).toFixed(2).replace('.', ',');
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${produto.nome}</strong> - R$ ${precoFormatado}
      <br>${produto.descricao}
      <br>
      <button data-id="${produto.id}" class="editar-btn">Editar</button>
      <button data-id="${produto.id}" class="deletar-btn">Excluir</button>
    `;
    lista.appendChild(li);
  });

  // Adiciona eventos aos botões
  document.querySelectorAll('.editar-btn').forEach(btn => {
    btn.addEventListener('click', () => editarProduto(Number(btn.dataset.id)));
  });

  document.querySelectorAll('.deletar-btn').forEach(btn => {
    btn.addEventListener('click', () => deletarProduto(Number(btn.dataset.id)));
  });
}

function editarProduto(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  document.getElementById('id').value = produto.id;
  document.getElementById('nome').value = produto.nome;
  document.getElementById('descricao').value = produto.descricao;
  document.getElementById('preco').value = produto.preco;
}

function deletarProduto(id) {
  produtos = produtos.filter(p => p.id !== id);
  atualizarDados();
}

document.getElementById('form-produto').addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('id').value || Date.now();
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const preco = document.getElementById('preco').value;
  const imagemInput = document.getElementById('imagem');

  const produtoExistente = produtos.find(p => p.id == id);

  const salvarOuAtualizarProduto = (imagemBase64) => {
    if (produtoExistente) {
      produtoExistente.nome = nome;
      produtoExistente.descricao = descricao;
      produtoExistente.preco = preco;
      if (imagemBase64) {
        produtoExistente.imagem = imagemBase64;
      }
    } else {
      const novoProduto = new Produto(id, nome, descricao, preco, imagemBase64);
      produtos.push(novoProduto);
    }

    atualizarDados();
    this.reset();
    document.getElementById('id').value = '';
  };

  if (imagemInput.files.length > 0) {
    const leitor = new FileReader();
    leitor.onload = function () {
      salvarOuAtualizarProduto(leitor.result);
    };
    leitor.readAsDataURL(imagemInput.files[0]);
  } else {
    salvarOuAtualizarProduto(null);
  }
});

listarProdutos();