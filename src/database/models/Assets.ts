import { Model, DataTypes } from 'sequelize';

import { sequelize } from './index';

/**
 * Assets Class Model
 */
class Assets extends Model {
  id!: number;
  type!: string;
  filename!: string;
  extension!: string;
  score_type_1!: number;
  score_type_2!: number;
  score_type_3!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Assets.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'video'
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    extension: {
      type: DataTypes.STRING,
      defaultValue: 'mp4',
    },
    score_type_1: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    score_type_2: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    score_type_3: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelize,
    tableName: 'assets',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Assets;
