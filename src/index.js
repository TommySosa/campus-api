import express from 'express'
import cors from 'cors'
import coursesRoutes from './routes/courses.routes.js'
import teachersRoutes from './routes/teachers.routes.js'
import studentsRoutes from './routes/students.routes.js'
import modulesRoutes from './routes/modules.routes.js'
import exercisesRoutes from './routes/exercises.routes.js'
import multipleRoutes from './routes/multiple.routes.js'

const app = express()

app.use(express.json())

app.use(cors({
    origin: '*'
}))

app.use('/api', coursesRoutes)
app.use('/api', studentsRoutes)
app.use('/api', teachersRoutes)
app.use('/api', modulesRoutes)
app.use('/api', exercisesRoutes)
app.use('/api', multipleRoutes)

app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
})