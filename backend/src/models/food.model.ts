import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface FoodAttributes {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Food extends Model<FoodAttributes> implements FoodAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public imageUrl!: string;
  public category!: string;
  public rating!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Food.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Food',
    tableName: 'foods',
  }
);

export default Food;
