import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'users',
    'user',
    'password', 
    {
        host: 'localhost',
        dialect: 'postgres',
    }
);

export default sequelize;