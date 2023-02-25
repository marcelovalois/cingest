import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes.js';
import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://cingest:senhaMongo1234@cingest.pooile3.mongodb.net/?retryWrites=true&w=majority'

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to database');
        app.emit('connected');
    })
    .catch(e => console.log(e));

app.use(cors()); // Cors, utilizado para questões de segurança
app.use(express.json()); // Middleware para o express aceitar requisições do tipo JSON
app.use(express.urlencoded({ extended: true })) // Middleware para o express aceitar requisições do tipo URLencoded
app.use(morgan('dev')) // Biblioteca para log de requisições HTTP
app.use(routes);

app.set('views', './src/views');
app.set('view engine', 'ejs');

//not found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404
    next(error)
})

//catch all
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})

app.on('connected', () => {
    app.listen(3333, () => console.log('App listening on port 3333!'));
})
