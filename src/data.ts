import { Group, Permission, User } from './types';

export const usersData: User[] = [
    {
        id: '1',
        login: 'Vasya',
        password: 'Qwerty123',
        age: 20,
        isDeleted: false,
    },
    {
        id: '2',
        login: 'Petya',
        password: '123Qwerty',
        age: 30,
        isDeleted: false,
    }
];

export const groupsData: Group[] = [
    {
        id: '1',
        name: 'readers',
        permissions: [ Permission.READ ],
    },
    {
        id: '2',
        name: 'writers',
        permissions: [ Permission.WRITE ],
    }
];

export const usersGroupsData: { userId: string, groupId: string }[] = [
    {
        userId: '1',
        groupId: '1',
    },
    {
        userId: '2',
        groupId: '1',
    },
    {
        userId: '2',
        groupId: '2',
    }
];