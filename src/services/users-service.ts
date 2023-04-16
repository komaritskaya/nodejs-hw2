import { v4 as uuid } from 'uuid';
import { NewUserData, User } from '../types';
import { UsersDTO } from '../data-access/users.dto';
import { Op } from 'sequelize';

export default class UsersService {
    usersModel

    constructor(usersModel) {
        this.usersModel = usersModel;
    }

    async getAll(): Promise<User[]> {
        const users = await this.usersModel.findAll();
        return users.map((user) => new UsersDTO(user));
    }

    async getById(id: string): Promise<User | null> {
        const user = await this.usersModel.findByPk(id);
        return user && new UsersDTO(user.get());
    }

    async getFilteredUsers({ login, limit }): Promise<User[]> {
        const options = {
            order: [[`login`, `asc`]]
        } as any;

        if (limit) {
            options.limit = limit;
        }

        if (login) {
            options.where = {
                login: {
                    [Op.substring]: login
                }
            }
        }
        
        const users = await this.usersModel.findAll(options);
        return users.map((user) => new UsersDTO(user));
    }


    async create(payload: NewUserData): Promise<User> {
        const newUser = await this.usersModel.create({ ...payload, id: uuid(), isDeleted: false});
        return newUser && new UsersDTO(newUser.get());
    }

    async update(id: string, payload: NewUserData): Promise<User | null> { 
        const user = await this.usersModel.findByPk(id);
        if (user) {
            user.login = payload.login;
            user.password = payload.password;
            user.age = payload.age;
            user.save()
        }
        return user && new UsersDTO(user);
    }

    async delete(id: string): Promise<User | null> {
        const user = await this.usersModel.findByPk(id);
        if (user && !user.isDeleted) {
            user.isDeleted = true;
            user.save()
        }
        return user && new UsersDTO(user);
    }
}
