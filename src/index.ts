import express, { Request, Response } from 'express';
import {
    ContainerTypes,
    ValidatedRequest,
    ValidatedRequestSchema,
  } from 'express-joi-validation'  
import { v4 as uuid } from 'uuid';
import Joi from 'joi';
import { users } from './data';
import { User } from './types';
import { validateSchema } from './validation';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

const userSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('(?=.*?[0-9])(?=.*?[A-Za-z]).+')).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
});

interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        login: string,
        password: string,
        age: number,
        isDeleted: boolean
    }
}

app.get(
    '/users',
    (req: Request, res: Response) => {
        res.status(200).json(users);
    }
);

app.get(
    '/users/:id',
    (req, res) => {
        const {id} = req.params;
        const index = users.findIndex(el => el.id === id);

        if ( index !== -1) {
            res.status(200).json(users[index]);
        } else {
            res.status(404).json('404 | not found');
        }
    }
);

app.post(
    '/users',
    validateSchema(userSchema),
    (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        const { login, password, age, isDeleted } = req.body;

        const newUser = { id: uuid(), login, password, age, isDeleted } as User;
        users.push(newUser)

        res.status(201).json(newUser)
    }
);

app.put(
    '/users/:id',
    validateSchema(userSchema),
    (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        const { login, password, age, isDeleted } = req.body;
        const { id } = req.params;
        const index = users.findIndex(el => el.id === id);

        if (index !== -1){
            users[index] = {
                ...users[index],
                login,
                password,
                age,
                isDeleted
            };

            res.status(200).json(users[index]);
        } else {
            res.status(404).json('404 | not found');
        }
    }
);

app.delete(
    '/users/:id',
    (req: Request, res: Response) => {
        const { id } = req.params;
        const index = users.findIndex(el => el.id === id);
        
        if(index !== -1) {
            if (!users[index].isDeleted) {
                users[index] = {
                    ...users[index],
                    isDeleted: true
                };
            }

            res.status(200).json(users[index]);
        } else {
            res.status(404).json('404 | not found');
        }
    }
);

app.listen(PORT, () => {
    process.stdout.write(`App is listening at http://localhost:${PORT}\n`);
});