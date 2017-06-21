const database: Interface.DB = {
  development: {
    username: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASS,
    database: process.env.DB_DEV,
    host: process.env.DB_DEV_HOST,
    dialect: process.env.DB_DEV_DIALECT
  },
  test: {
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASS,
    database: process.env.DB_TEST,
    host: process.env.DB_TEST_HOST,
    dialect: process.env.DB_TEST_DIALECT
  },
  production: {
    username: process.env.DB_PRD_USER,
    password: process.env.DB_PRD_PASS,
    database: process.env.DB_PRD,
    host: process.env.DB_PRD_HOST,
    dialect: process.env.DB_PRD_DIALECT
  }
};

export = database;
