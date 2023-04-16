import { User } from '../types';

export class UsersDTO {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;

    constructor(payload: User) {
        this.id = payload.id;
        this.login = payload.login;
        this.password = payload.password;
        this.age = payload.age;
        this.isDeleted = payload.isDeleted;
    }
}