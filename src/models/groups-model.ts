import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import { Permission } from '../types';

const GroupsModel = sequelize.define('group', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(Permission))),
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default GroupsModel;
