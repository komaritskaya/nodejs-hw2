import GroupsService from '../services/groups-service';
import { NewGroupData, Group } from '../types';

export default class GroupsController {
    groupsService: GroupsService;

    constructor(groupsService: GroupsService) {
        this.groupsService = groupsService;
    }

    async getGroups(): Promise<Group[]> {
        return this.groupsService.getAll();
    }

    async getGroupById(id: string): Promise<Group | null> {
        return this.groupsService.getById(id);
    }

    async createGroup(payload: NewGroupData): Promise<Group> {
        return this.groupsService.create(payload);
    }

    async updateGroup(id: string, payload: NewGroupData): Promise<Group | null> {
        return this.groupsService.update(id, payload);
    }

    async deleteGroup(id: string): Promise<boolean> {
        return this.groupsService.delete(id);
    }
}
