# Micro-Email-service

Micro Email Services (with elasticemail).
Version 1.0.0

**Installation**
* npm install


**Run**
* gulp scripts (build ts files)
* npm run build (build project)
* npm run build-watch (realtime build project)
* npm start (start the API)


**Database Migration**
* cp config.example.json config.json
* npm run migrate (DB Migration using sequelizejs)


**Testing**
* npm test (unit test using mocha)
* gulp tslint (unit test using tslint)


**Features**
* [Hapijs](https://github.com/hapijs/hapi) - REST Api
* [SequelizeJS](https://github.com/sequelize/sequelize) - ORM
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Authentication
* [Mocha](https://github.com/mochajs/mocha) - Unit Testing
* [tslint](https://github.com/panuhorsmalahti/gulp-tslint) - Unit Testing
* [Hapi Swagger](https://github.com/glennjones/hapi-swagger) - Documentation
