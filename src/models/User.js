const { DataTypes } = require("sequelize");
const cypherService = require("../services/cypher");
const connectDb = require("../config/connect-db");

const conn = connectDb();

const hooks = {
  beforeCreate(user) {
    user.password = cypherService().password(user);
  },
};

const User = conn.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { hooks, tableName: "Users", timestamps: false }
);

module.exports = User;
