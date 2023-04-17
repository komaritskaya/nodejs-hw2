import { Group, Permission } from '../types';

export class GroupsDTO {
    id: string;
    name: string;
    permissions: Permission[];

    constructor(payload: Group) {
        this.id = payload.id;
        this.name = payload.name;
        this.permissions = payload.permissions;
    }
}