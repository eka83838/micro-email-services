import * as Sequelize from "sequelize";

export default function defineEmail(Sequelize: Sequelize.Sequelize, DataTypes: any) {
    var LogEmail = Sequelize.define("LogEmail", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true
        },
        message_id: DataTypes.STRING,
        transaction_id: DataTypes.STRING,
        email_from: DataTypes.STRING,
        email_to: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models: any) {
                // associations can be defined here
            }
        }
    });
    return LogEmail;
}
