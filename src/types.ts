import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export enum Permission {  
    READ = 'READ',
    WRITE = 'WRITE',
    DELETE = 'DELETE',
    SHARE = 'SHARE',
    UPLOAD_FILES ='UPLOAD_FILES'
}

export type NewUserData = {
    login: string;
    password: string;
    age: number;
};

export type User = NewUserData & {
    id: string;
    isDeleted: boolean;
};

export type NewGroupData = {
    name: string;
    permissions: Permission[];
};

export type Group = NewGroupData & {
    id: string;
};

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        login: string,
        password: string,
        age: number,
    }
}

export interface GroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        name: string,
        permissions: Permission[],
    }
}

export type SearchParams = {
    login?: string;
    limit?: number;
}