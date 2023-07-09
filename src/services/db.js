const sqlite3 = require('sqlite3');
const path = require('path')

//console.log(path.sep)

const pathDB = path.resolve(process.cwd(),'src','db','database.sqlite')
const db = new sqlite3.Database(pathDB)

//console.log(pathDB)

const run = (query, params = []) => {
    return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
        if (error) {
        return reject(error);
        }
        return resolve({ status: true, lastID: this.lastID, changes:this.changes });
    });
    });
};

const get = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (error, rows) => {
        if (error) {
        return reject(error);
        }
        return resolve(rows);
    });
    });
};


const initDB = async () => {
    try {
        await run(
            `CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT,
            isDone INTEGER DEFAULT 0,
            data_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            data_time_edit TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )`);
    } catch(error) {
        console.log(error)
    }
    //,
    //        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}
//console.log(run())

module.exports = {
    initDB,
    run,
    get
}