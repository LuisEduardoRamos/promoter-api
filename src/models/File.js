const { DataTypes } = require("sequelize");
const connectDb = require("../config/connect-db");
const Prospect = require("./Prospect");

const conn = connectDb();

const File = conn.define(
  "File",
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
    path: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    prospect_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Prospect,
        key: "id",
      },
    }
  },
  {
    timestamps: false,
    tableName: "Files",
  }
);

File.belongsTo(Prospect, { foreignKey: "prospect_id" });

module.exports = File;
