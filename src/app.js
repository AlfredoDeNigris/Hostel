import express from 'express';
import db from './config/connectionConfig.js';
import { notFoundHandler, errorHandler } from './middlewares/appErrorHandler.js';
// import userRoutes from './routes/userR.js';
// import a from './middlewares/auth.js';

const app = express();


app.use((req, res, next) => {
    req.pool = db;
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());


// app.use('/user', userRoutes);
// app.post('/login', a.login);


app.get('/isAlive', (req, res) => {
    res.sendStatus(200);
});

app.use(notFoundHandler);

app.use(errorHandler);


export default app;