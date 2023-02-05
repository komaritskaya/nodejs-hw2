import { v4 as uuid } from 'uuid';
import { NewUserData, User } from '../types';

export class UsersModel {
    users: User[];

    constructor(users: User[]) {
        this.users = users;
    }

    getAll(): User[] {
        return this.users;
    }

    getById(id: string): User | null {
        return this.users.find(el => el.id === id) ?? null;
    }

    getFilteredUsers(loginSubstring?: string, limit?: number): User[] {
        let filteredUsers = this.users; 

        if (loginSubstring) {
            filteredUsers = this.users
                .filter(el => el.login.includes(loginSubstring.toLowerCase()))
                .sort((a, b) => a.login < b.login ? -1 : 1);
        }

        return limit ? filteredUsers.slice(0, limit) : filteredUsers;
    }

    create(payload: NewUserData): User {
        const newUser = { ...payload, id: uuid(), isDeleted: false};
        this.users.push(newUser);
        return newUser;
    }

    update(id: string, payload: NewUserData): User | null {
        const { login, password, age } = payload;
        const index = this.users.findIndex(el => el.id === id);

        if (index !== -1){
            this.users[index] = {
                ...this.users[index],
                login,
                password,
                age
            };

            return this.users[index];
        }

        return null;
    }

    delete(id: string): User | null {
        const index = this.users.findIndex(el => el.id === id);
        
        if(index !== -1) {
            if (!this.users[index].isDeleted) {
                this.users[index] = {
                    ...this.users[index],
                    isDeleted: true
                };
            }

            return this.users[index];
        }

        return null;
    }
}