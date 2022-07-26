import { useState } from 'react'
import './style.scss'
import Axios from 'axios'

export const Modal = props => {
  const [img, setImg] = useState('')
  const [titulo, setTitulo] = useState('')
  const [preco, setPreco] = useState()
  const [descricao, setDescricao] = useState('')

  var mod = ''

  function closeModal() {
    var modal = document.getElementById('modal')
    mod = modal
    modal.style.display = 'none'
  }

  window.onclick = function (event) {
    if (event.target === mod) {
      mod.style.display = 'none'
    }
  }

  const submit = () => {
    const nData = new Date().toLocaleDateString('pt-br')
    console.log(titulo, descricao, preco, img, nData)

    Axios.post('http://localhost:3002/api/insert', {
      nome: titulo,
      descricao: descricao,
      preco: preco,
      img: img,
      data: nData
    }).then(() => {
      alert('Successo: Produto Inserido')
    })
    closeModal()
    document.location.reload(true)
  }

  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => closeModal()}>
          &times;
        </span>
        <p id="view-name">Adicionar novo produto</p>
        <form id="formNovoProduto" onSubmit={() => submit()}>
          <label>
            Título
            <input
              type="text"
              name="titulo"
              onChange={e => setTitulo(e.target.value)}
              required
            />
          </label>
          <label>
            Preço do Produto
            <input
              type="text"
              name="preco"
              onChange={e => setPreco(e.target.value)}
              required
            />
          </label>
          <label>
            Url da Imagem
            <input
              type="text"
              name="img"
              onChange={e => setImg(e.target.value)}
              required
            />
          </label>
          <label>
            Descrição do Produto
            <textarea
              name="descricao"
              onChange={e => setDescricao(e.target.value)}
              required
            />
          </label>
          <div className="buttons">
            <button id="bSalvar" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
