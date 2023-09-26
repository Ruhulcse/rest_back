module.exports = {
    development: {
      client: "mysql",
      connection: {
        host: "db4free.net",
        port: 3306,
        user: "saasdb7862",
        password: "saasdb7862",
        database: "saasdb",
      },
      pool: {
        min: 10,
        max: 50,
      },
      migrations: {
        tableName: "knex_migrations",
      },
    },
  };