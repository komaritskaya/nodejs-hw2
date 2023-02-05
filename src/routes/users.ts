import { Request, Response, Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { userSchema, validateSchema } from '../validators/users-validators';
import { UsersController } from '../controllers/users-controller';
import { UsersModel } from '../models/users-model';
import { UserRequestSchema } from '../types';
import { users } from '../data';

const router = Router();
const usersModel = new UsersModel(users);
const usersController = new UsersController(usersModel);

router.get(
    '/users',
    (req: Request, res: Response) => {
        const users = usersController.getUsers(req.query);
        res.status(200).json(users);
    }
);

router.get(
    '/users/:id',
    (req: Request, res: Response) => {
        const {id} = req.params;
        const user = usersController.getUserById(id);

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
    (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        const { login, password, age } = req.body;
        const newUser = usersController.createUser({ login, password, age });

        res.status(201).json(newUser)
    }
);

router.put(
    '/users/:id',
    validateSchema(userSchema),
    (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
        const { login, password, age } = req.body;
        const { id } = req.params;
        const updatedUser = usersController.updateUser(id, { login, password, age });

        if (!updatedUser){
            res.status(404).json('404 | not found');
        } else {
            res.status(200).json(updatedUser);
        }
    }
);

router.delete(
    '/users/:id',
    (req: Request, res: Response) => {
        const { id } = req.params;
        const deletedUser = usersController.deleteUser(id);
        
        if(!deletedUser) {
            res.status(404).json('404 | not found');
        } else {
            res.status(200).json(deletedUser);
        }
    }
);

export default router;

