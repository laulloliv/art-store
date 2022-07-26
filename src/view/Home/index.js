import { Detalhes, Menu, Produto } from '../../components/Outros'
import iSeta from '../../img/seta.png'
import iConfig from '../../img/config.png'
import iOk from '../../img/ok.png'
import iAdd from '../../img/add.png'
import './styles.scss'
import { useEffect, useState } from 'react'
import { Modal } from '../../components/Modal/insert'
import axios, * as others from 'axios'
import { ModalUpd } from '../../components/Modal/update'

export default function Home() {
  const [detalhes, setDetalhes] = useState(false)
  const [config, setConfig] = useState(false)
  const [img, setImg] = useState('')
  const [titulo, setTitulo] = useState('')
  const [valor, setValor] = useState('')
  const [descricao, setDescricao] = useState('')
  const [listaProdutos, setListaProdutos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3002/api/get').then(res => {
      setListaProdutos(res.data)
    })
  }, [])

  const toRight = () => {
    const element = document.getElementById('lista-itens')
    element.scrollLeft += 250
  }

  function toLeft() {
    const element = document.getElementById('lista-itens')
    element.scrollLeft -= 250
  }

  function view(mod) {
    var modal = document.getElementById(mod)
    modal.style.display = 'block'
  }

  const ListaProdutos = props => {
    const produtos = props.produtos
    const listaItens = produtos.map(item => (
      <li id={item.id}>
        <Produto
          titulo={item.nome}
          valor={'R$ ' + item.preco}
          img={item.img}
          id={item.id}
          config={config}
          onClick={() => {
            setDetalhes(true)
            setImg(item.img)
            setTitulo(item.nome)
            setValor('R$ ' + item.preco)
            setDescricao(item.descricao)
          }}
          onView={() => view('modalUpd' + item.id)}
        ></Produto>
        <ModalUpd
          idMod={'modalUpd' + item.id}
          idProd={item.id}
          nome={item.nome}
          img={item.img}
          preco={item.preco}
          descricao={item.descricao}
        ></ModalUpd>
      </li>
    ))
    return (
      <div id="lista">
        <img
          id="lSeta"
          src={iSeta}
          alt="Seta avançar"
          onClick={() => toLeft()}
        />
        <ul id="lista-itens">{listaItens}</ul>
        {config ? (
          <img
            src={iAdd}
            alt="icon adiciona produto"
            id="iAdd"
            onClick={() => view('modal')}
          />
        ) : (
          ''
        )}
        <img
          id="rSeta"
          src={iSeta}
          alt="Seta avançar"
          onClick={() => toRight()}
        />
      </div>
    )
  }

  return (
    <>
      <Menu></Menu>
      <div className="main">
        <img
          id="config"
          src={!config ? iConfig : iOk}
          alt="Config icon"
          onClick={() => setConfig(!config)}
        />
        <p id="text">Quadros Disponíveis!</p>
        <div className="produtos">
          <ListaProdutos produtos={listaProdutos}></ListaProdutos>
        </div>

        {detalhes ? (
          <>
            <Detalhes
              img={img}
              titulo={titulo}
              descricao={descricao}
              valor={valor}
              onClick={() => setDetalhes(false)}
            ></Detalhes>
            <div className="footer"></div>
          </>
        ) : (
          ''
        )}
        <Modal></Modal>
      </div>
    </>
  )
}
