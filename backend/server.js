import express from 'express'
import { questionRoutes } from './api/question.route.js'
import cors from 'cors'
const app = express()
const PORT = 3030

// Middleware
app.use(cors())
app.use(express.json())
app.use('/api/questions', questionRoutes)

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express server!')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
