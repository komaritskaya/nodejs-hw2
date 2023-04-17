import sequelize from "../config/sequelize";
import UsersModel from "./users-model";
import GroupsModel from "./groups-model";
import { groupsData, usersData, usersGroupsData } from "../data";
import { DataTypes } from "sequelize";

const UserGroup = sequelize.define(
    "user_group",
    {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: UsersModel,
                key: 'id'
            }
        },
        groupId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: GroupsModel,
                key: 'id'
            }
        }
    },
    { timestamps: false }
  );

export const initModels = () => {
    UsersModel.belongsToMany(GroupsModel, {
        through: UserGroup,
        as: 'groups',
        foreignKey: 'userId'  
      });
      
    GroupsModel.belongsToMany(UsersModel, {
        through: UserGroup,
        as: 'users',
        foreignKey: 'groupId'  
    });

    UsersModel.bulkCreate(usersData);
    GroupsModel.bulkCreate(groupsData);
    UserGroup.bulkCreate(usersGroupsData);
}
