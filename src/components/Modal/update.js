import { useState } from 'react'
import './style.scss'
import axios, * as others from 'axios'

export const ModalUpd = props => {
  const [id, setId] = useState(props.idProd)
  const [img, setImg] = useState(props.img)
  const [titulo, setTitulo] = useState(props.nome)
  const [preco, setPreco] = useState(props.preco)
  const [descricao, setDescricao] = useState(props.descricao)

  var mod = ''

  function closeModal(modal) {
    var modal = document.getElementById(modal)
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
    console.log(titulo, img, preco, descricao)
    console.log('22')
    axios
      .patch('http://localhost:3002/api/update', {
        id: id,
        nome: titulo,
        descricao: descricao,
        preco: preco,
        img: img,
        data: nData
      })
      .then(() => {
        alert('Successo: Produto Inserido')
      })
    closeModal(props.idMod)
    document.location.reload(true)
  }

  return (
    <div id={props.idMod} className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => closeModal(props.idMod)}>
          &times;
        </span>
        <p id="view-name">Editar Produto</p>
        <div id="formNovoProduto">
          <label>
            Título
            <input
              type="text"
              name="titulo"
              onChange={e => setTitulo(e.target.value)}
              value={titulo}
              required
            />
          </label>
          <label>
            Preço do Produto
            <input
              type="text"
              name="preco"
              onChange={e => setPreco(e.target.value)}
              value={preco}
              required
            />
          </label>
          <label>
            Url da Imagem
            <input
              type="text"
              name="img"
              onChange={e => setImg(e.target.value)}
              value={img}
              required
            />
          </label>
          <label>
            Descrição do Produto
            <textarea
              name="descricao"
              onChange={e => setDescricao(e.target.value)}
              value={descricao}
              required
            />
          </label>
          <div className="buttons">
            <button id="bSalvar" onClick={() => submit()}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
