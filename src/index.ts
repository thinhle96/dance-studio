export const CONFIG_TYPE = {
    NODE_ENV: 'NODE_ENV',
    SERVER_TIMEOUT: 'SERVER_TIMEOUT',
    SERVER_PORT: 'SERVER_PORT',
    HTTP_TIMEOUT: 'HTTP_TIMEOUT',
    HTTP_MAX_REDIRECTS: 'HTTP_MAX_REDIRECTS',
    PM2_ECOSYSTEM_INSTANCE: 'PM2_ECOSYSTEM_INSTANCE',
    DATABASE_HOST: 'DATABASE_HOST',
    DATABASE_PORT: 'DATABASE_PORT',
    DATABASE_USERNAME: 'DATABASE_USERNAME',
    DATABASE_PASSWORD: 'DATABASE_PASSWORD',
    DATABASE_NAME: 'DATABASE_NAME',
    DATABASE_TYPE: 'DATABASE_TYPE',
    DATABASE_CONNECTION_TIME_OUT: 'DATABASE_CONNECTION_TIME_OUT',
    DATABASE_CONNECTION_LIMIT: 'DATABASE_CONNECTION_LIMIT',
    JWT_SECRET: 'JWT_SECRET',
    JWT_EXP: 'JWT_EXP',
};

export default () => ({
    [CONFIG_TYPE.SERVER_TIMEOUT]: process.env.SERVER_TIMEOUT,
    [CONFIG_TYPE.SERVER_PORT]: process.env.SERVER_PORT,
    [CONFIG_TYPE.HTTP_TIMEOUT]: process.env.HTTP_TIMEOUT,
    [CONFIG_TYPE.HTTP_MAX_REDIRECTS]: process.env.HTTP_MAX_REDIRECTS,
    [CONFIG_TYPE.DATABASE_HOST]: process.env.DATABASE_HOST,
    [CONFIG_TYPE.DATABASE_PORT]: process.env.DATABASE_PORT,
    [CONFIG_TYPE.DATABASE_USERNAME]: process.env.DATABASE_USERNAME,
    [CONFIG_TYPE.DATABASE_PASSWORD]: process.env.DATABASE_PASSWORD,
    [CONFIG_TYPE.DATABASE_NAME]: process.env.DATABASE_NAME,
    [CONFIG_TYPE.DATABASE_TYPE]: process.env.DATABASE_PASSWORD,
    [CONFIG_TYPE.DATABASE_CONNECTION_TIME_OUT]:
    process.env.DATABASE_CONNECTION_TIME_OUT,
    [CONFIG_TYPE.DATABASE_CONNECTION_LIMIT]:
    process.env.DATABASE_CONNECTION_LIMIT,
    [CONFIG_TYPE.JWT_SECRET]: process.env.JWT_SECRET,
    [CONFIG_TYPE.JWT_EXP]: process.env.JWT_EXP,
});
