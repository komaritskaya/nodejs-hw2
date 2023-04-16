import UsersService from '../services/users-service';
import { NewUserData, SearchParams, User } from '../types';

export default class UsersController {
    usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    async getUsers(searchParams: SearchParams): Promise<User[]> {
        const { login, limit } = searchParams;
    
        if (!login && !limit) {
            return this.usersService.getAll();
        }

        return this.usersService.getFilteredUsers({ login, limit });
    }

    async getUserById(id: string): Promise<User | null> {
        return this.usersService.getById(id);
    }

    async createUser(payload: NewUserData): Promise<User> {
        return this.usersService.create(payload);
    }

    async updateUser(id: string, payload: NewUserData): Promise<User | null> {
        return this.usersService.update(id, payload);
    }

    async deleteUser(id: string): Promise<User | null> {
        return this.usersService.delete(id);
    }
}
