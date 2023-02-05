import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export type NewUserData = {
    login: string;
    password: string;
    age: number;
};

export type User = NewUserData & {
    id: string;
    isDeleted: boolean;
};

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        login: string,
        password: string,
        age: number,
        isDeleted: boolean
    }
}

export type SearchParams = {
    login?: string;
    limit?: number;
}