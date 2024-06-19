import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import SequelizeStore from 'connect-session-sequelize';
dotenv.config();

import ProductsRoute from './src/routes/products/products.js';
import CategoriesRoute from './src/routes/categories/categories.js';
import BrandRoute from './src/routes/brand/brand.js';
import ResupplyRoute from './src/routes/resupply/resupply.js';
import TransactionRoute from './src/routes/transactions/tokenizer.js';
import UsersRoute from './src/routes/users/users.js';
import AuthRoute from './src/routes/users/auth.js';
import CriteriaRoute from './src/routes/spk/criteria.js';
import MiatkWrenchRoute from './src/routes/spk/miatk_wrench.js';
import RankWrenchRoute from './src/routes/spk/rank_wrench.js';
import RankHammerRoute from './src/routes/spk/rank_hammer.js';
import RankDrillRoute from './src/routes/spk/rank_drill.js';
import RankGrinderRoute from './src/routes/spk/rank_grinder.js';

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
        sameSite: 'strict' // Set to 'none' if using cross-site requests
    },
}))

app.use("/api", ProductsRoute);
app.use("/api", CategoriesRoute);
app.use("/api", BrandRoute);
app.use("/api", ResupplyRoute);
app.use("/api", TransactionRoute);
app.use("/api", UsersRoute);
app.use("/api", AuthRoute);
app.use("/api", CriteriaRoute);
app.use("/api", MiatkWrenchRoute);
app.use("/api", RankWrenchRoute);
app.use("/api", RankHammerRoute);
app.use("/api", RankDrillRoute);
app.use("/api", RankGrinderRoute);

store.sync();

app.listen(port, () => {
    console.log(`app running on port http://localhost:${port}/api`);
});