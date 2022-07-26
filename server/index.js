const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@oliv31r4dba',
  database: 'store'
})

db.connect(function (err) {
  if (err) throw err
  console.log('Database Connected!')
})
module.exports = db

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM  produto'
  db.query(sqlSelect, (eer, result) => {
    res.send(result)
  })
})

app.post('/api/insert', (req, res) => {
  const nome = req.body.nome
  const descricao = req.body.descricao
  const preco = req.body.preco
  const img = req.body.img
  const data = req.body.data

  const sqlInsert =
    'INSERT INTO produto (nome, descricao, preco, img, data_criacao) VALUES (?,?,?,?,?);'
  db.query(sqlInsert, [nome, descricao, preco, img, data], (eer, result) => {
    if (eer) console.log(eer)
  })
})

app.patch('/api/update', (req, res) => {
  const id = req.body.id
  const nome = req.body.nome
  const descricao = req.body.descricao
  const preco = req.body.preco
  const img = req.body.img
  const data = req.body.data

  const sqlUpdate =
    'UPDATE produto SET nome = ?, descricao = ?, preco = ?, img = ?, data_atualizacao = ? WHERE id = ?'
  db.query(
    sqlUpdate,
    [nome, descricao, preco, img, data, id],
    (eer, result) => {
      if (eer) console.log(eer)
    }
  )
})

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id

  const sqlDelete = 'DELETE FROM produto WHERE id = ?'
  db.query(sqlDelete, [id], (eer, result) => {
    if (eer) console.log(eer)
  })
})

app.listen(3002, () => {
  console.log(`Server is listening on port 3002`)
})
