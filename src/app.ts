import express from 'express';
import router from './routes';
import sequelize from './config/sequelize';
import { initModels } from './models';

const PORT = process.env.PORT || 3001;
const app = express();

const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connected to DB!`);
    } catch (err) {
        console.error(`Connection failed: ${err}`);
    }

    await sequelize.sync({ force: true }).catch((err) => console.error(err));
    initModels();
};


app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    process.stdout.write(`App is listening at http://localhost:${PORT}\n`);
});

connectToDB();