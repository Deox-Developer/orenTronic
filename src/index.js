//Importaciones de servicio
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import accountRoutes from './routes/account.routes.js'
import catalogRoutes from './routes/catalog.routes.js'
import permissionRoutes from './routes/permission.routes.js'

//Configuraciones
dotenv.config();
const app = express()


//midelwords -> Backend

app.use(express.json())
app.use(morgan('dev'));

//Rutas -> Backend

app.use('/api/', accountRoutes)
app.use('/api/', catalogRoutes)
app.use('/api/', permissionRoutes)


app.listen(process.env.PORT)
console.log('Backend ACTIVO - OrenTronic Port:',process.env.PORT,"by FortiGuard App")