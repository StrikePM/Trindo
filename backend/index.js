import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import SequelizeStore from 'connect-session-sequelize';
dotenv.config();

import ProductsRoute from './src/routes/products/products.js';
import CategoriesRoute from './src/routes/categories/categories.js';
import ResupplyRoute from './src/routes/resupply/resupply.js';
import UsersRoute from './src/routes/users/users.js';
import AuthRoute from './src/routes/users/auth.js';

const port = process.env.APP_PORT;
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // If you're using cookies or sessions
        optionsSuccessStatus: 204,
    })
);

const sequelize = new Sequelize({
    database: 'dbtrindo',
    username: 'root',
    password: '',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: false // Set to true for debugging
});

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: sequelize
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        sameSite: 'none' // Set to 'none' if using cross-site requests
    },
}))

app.use("/api", ProductsRoute);
app.use("/api", CategoriesRoute);
app.use("/api", ResupplyRoute);
app.use("/api", UsersRoute);
app.use("/api", AuthRoute);

store.sync();

app.listen(port, () => {
    console.log(`app running on port http://localhost:${port}/api`);
});