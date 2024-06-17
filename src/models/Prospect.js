const { DataTypes } = require("sequelize");
const User = require("./User");
const connectDb = require("../config/connect-db");

const conn = connectDb();

const Prospect = conn.define(
  "Prospect",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    first_surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    second_surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    number: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    rfc: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    attended_by: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "Prospects",
  }
);

Prospect.belongsTo(User, { foreignKey: "attended_by" });

module.exports = Prospect;
