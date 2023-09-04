import express from 'express'
import cors from 'cors'
import coursesRoutes from './routes/courses.routes.js'
import teachersRoutes from './routes/teachers.routes.js'
import studentsRoutes from './routes/students.routes.js'


const app = express()

app.use(express.json())

app.use(cors({
    origin: '*'
}))

app.use('/api', coursesRoutes)
app.use('/api', studentsRoutes)
app.use('/api', teachersRoutes)

app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
})