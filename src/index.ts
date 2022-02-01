import express, { NextFunction, Request, Response } from 'express'
import { bookStoreCorsMiddleware } from './generated/routers/bookStoreCorsMiddleware'

const port = 5000

const app = express()

app.set('json spaces', 2)

app.use(express.json())
app.use(bookStoreCorsMiddleware('http://localhost:3000'))
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json([{ message: `${error}` }])
})

app.listen(port, () => {
  console.log(`Book store app listening at http://localhost:${port}`)
})
