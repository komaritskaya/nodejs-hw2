import { v4 as uuid } from 'uuid';
import { NewGroupData, Group } from '../types';
import { GroupsDTO } from '../data-access/groups.dto';

export default class GroupsService {
    groupsModel

    constructor(groupsModel) {
        this.groupsModel = groupsModel;
    }

    async getAll(): Promise<Group[]> {
        const groups = await this.groupsModel.findAll();
        return groups.map((group) => new GroupsDTO(group));
    }

    async getById(id: string): Promise<Group | null> {
        const group = await this.groupsModel.findByPk(id);
        return group && new GroupsDTO(group.get());
    }

    async create(payload: NewGroupData): Promise<Group> {
        const newGroup = await this.groupsModel.create({ ...payload, id: uuid() });
        return newGroup && new GroupsDTO(newGroup.get());
    }

    async update(id: string, payload: NewGroupData): Promise<Group | null> { 
        const group = await this.groupsModel.findByPk(id);
        if (group) {
            group.name = payload.name;
            group.permissions = payload.permissions;
            group.save()
        }
        return group && new GroupsDTO(group);
    }

    async delete(id: string): Promise<boolean> {
        const rows = await this.groupsModel.destroy({ where: {id} });
        return Boolean(rows);
    }
}
