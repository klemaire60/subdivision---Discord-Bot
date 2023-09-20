const mysql = require("mysql")

module.exports = async () => {

    let db = await mysql.createConnection({
        host: "161.97.78.70:3306",
        user: "u19700_XPiNE1LUd2",
        password: "4XH!PUIH6d6z=P@0xHTcdOd.",
        database: "kactus"
    })

    return db;
}