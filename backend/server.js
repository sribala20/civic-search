import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

//import Database from '...'

//import { applyKeywordItemSearch } from '...'

const app = express()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())
const port = 8000
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!')
})

app.get('/users', async (req, res) => {
  const users = await Database.getUsers()
  const statusCode = users === undefined ? 500 : 200

  res.status(statusCode).send(users)
})

app.listen(process.env.PORT || port, () => {
  console.log('REST API is listening on http://localhost:8000')
})