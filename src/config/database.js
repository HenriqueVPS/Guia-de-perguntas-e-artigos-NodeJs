module.exports = {
    dialect: 'postgres',
    timezone: "-03:00",
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'guiapress',
    port: 5433,
    define: {
        timestamps: true,
        underscored: true
    }
}