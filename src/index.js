import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config();
const app = express()



app.use(express.json())
app.use(morgan('dev'));

app.listen(process.env.PORT)
console.log('server on port',process.env.PORT)