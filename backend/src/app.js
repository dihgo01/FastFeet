const express = require('express');
const routes = require('./routes/routes')
const db = require('./database')

class App {
    constructor () {
        this.app = express();
        this.app.use(express.json());
        this.routes();
        this.connection();
    }
    
    routes () {
        this.app.use(routes)
    }
   
    async connection () {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


}

module.exports = new App().app