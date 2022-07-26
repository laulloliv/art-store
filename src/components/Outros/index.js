import './style.scss'
import iCarrinho from '../../img/carrinho.png'
import iPincel from '../../img/pincel.png'
import iEdita from '../../img/edita.png'
import iDeleta from '../../img/deleta.png'
import { useState } from 'react'
import Axios from 'axios'
// import { Modal } from '../Modal/update'

export const Menu = () => {
  return (
    <div id="header">
      <p>
        Art <img src={iPincel} alt="Pincel" /> Space
      </p>
      <img src={iCarrinho} alt="Carrinho de compras" />
    </div>
  )
}

export const Produto = props => {
  const [config, setConfig] = useState(props.config)
  const [deleta, setDeleta] = useState(false)

  const deletaProduto = id => {
    Axios.delete(`http://localhost:3002/api/delete/${id}`)
    document.location.reload(true)
  }

  return (
    <>
      {!deleta ? (
        <div className="produto">
          <div className="imgs">
            <img
              id="iProduto"
              src={props.img}
              alt="Produto imagem"
              onClick={props.onClick}
            />

            {config ? (
              <div className="icons">
                <img
                  id="iEdita"
                  src={iEdita}
                  alt="icon edita"
                  onClick={props.onView}
                />
                <img
                  id="iDeleta"
                  src={iDeleta}
                  alt="icon deleta"
                  onClick={() => deletaProduto(props.id)}
                />
              </div>
            ) : (
              ''
            )}
          </div>
          <p id="titulo">{props.titulo}</p>
          <p id="valor">{props.valor}</p>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export const Detalhes = props => {
  return (
    <div className="detalhes" id="det">
      <img id="iDetalhes" src={props.img} alt="Produto imagem" />
      <div className="descricao">
        <p id="dTitulo" className="cTitulo">
          {props.titulo}
        </p>
        <p id="dDescricao" className="cDescricao">
          {props.descricao}
        </p>
        <div id="dComprar">
          <p id="dValor">{props.valor}</p>
          <button id="bAddCarrinho">Adicionar ao carrinho</button>
        </div>
      </div>
      <p className="closeDiv" onClick={props.onClick}>
        X
      </p>
    </div>
  )
}
