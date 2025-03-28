export default () => ({
    port: parseInt(process.env.PORT || ''),
    secret: process.env.SECRET,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT || ''),
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS
});