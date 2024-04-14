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

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!')
})

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the route to handle user data
app.post('/search', (req, res) => {
  // Extract data from the request body
  const { search } = req.body;

  // Perform any necessary backend processing with the received data
  const response_data = {
    message: 'Data received successfully!',
    query: search
  };
  // Return the response as JSON
  res.json(response_data);
});

app.listen(process.env.PORT || port, () => {
  console.log('REST API is listening on http://localhost:8000')
})

