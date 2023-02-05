import { UsersModel } from '../models/users-model';
import { NewUserData, SearchParams, User } from '../types';

export class UsersController {
    usersModel: UsersModel;

    constructor(usersModel: UsersModel) {
        this.usersModel = usersModel;
    }

    getUsers(searchParams: SearchParams): User[] {
        const { login, limit } = searchParams;
    
        if (!login && !limit) {
            return this.usersModel.getAll();
        }

        return this.usersModel.getFilteredUsers(login, limit);
    }

    getUserById(id: string): User | null {
        return this.usersModel.getById(id);
    }

    createUser(payload: NewUserData) {
        return this.usersModel.create(payload);
    }

    updateUser(id: string, payload: NewUserData) {
        return this.usersModel.update(id, payload);
    }

    deleteUser(id: string) {
        return this.usersModel.delete(id);
    }
}
