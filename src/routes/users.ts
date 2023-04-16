import { Request, Response, Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { userSchema, validateSchema } from '../validators/users-validators';
import { UserRequestSchema } from '../types';
import UsersController from '../controllers/users-controller';
import UsersModel from '../models/users-model';
import UsersService from '../services/users-service';

const router = Router();
const usersService = new UsersService(UsersModel);
const usersController = new UsersController(usersService);

router.get(
    '/users',
    async (req: Request, res: Response) => {
        const users = await usersController.getUsers(req.query);
        res.status(200).json(users);
    }
);

router.get(
    '/users/:id',
    async (req: Request, res: Response) => {
        const {id} = req.params;
        const user = await usersController.getUserById(id);

        if (!user) {
            res.status(404).json('404 | not found');
        } else {
            res.status(200).json(user);
        }
    }
);

router.post(
    '/users',
    validateSchema(userSchema),
    async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        const { login, password, age } = req.body;
        const newUser = await usersController.createUser({ login, password, age });

        res.status(201).json(newUser)
    }
);

router.put(
    '/users/:id',
    validateSchema(userSchema),
    async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        const { login, password, age } = req.body;
        const { id } = req.params;
        const updatedUser = await usersController.updateUser(id, { login, password, age });

        if (!updatedUser){
            res.status(404).json('404 | not found');
        } else {
            res.status(200).json(updatedUser);
        }
    }
);

router.delete(
    '/users/:id',
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const deletedUser = await usersController.deleteUser(id);
        
        if(!deletedUser) {
            res.status(404).json('404 | not found');
        } else {
            res.status(200).json(deletedUser);
        }
    }
);

export default router;

