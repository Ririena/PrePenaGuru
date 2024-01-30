import { sequelize } from "../config/db.js";

export default async function() {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");    
}