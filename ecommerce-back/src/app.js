import express from 'express';
import usersRouter from './routes/users.router.js';
import sessionsRouter from './routes/sessions.router.js';
import productsRouter from './routes/products.router.js';
import ordersRouter from './routes/orders.router.js';
import cartsRouter from './routes/carts.router.js';
import cors from 'cors';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/orders', ordersRouter);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const server = app.listen(9090,()=> console.log('Server Listening'));