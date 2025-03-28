export default () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || ''),
    secret: process.env.SECRET,
    dbUrl: process.env.DB_URL,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT || ''),
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS
});