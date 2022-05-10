export function DatabaseConfig(): any {
  return {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    type: process.env.DATABASE_TYPE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeout: parseInt(process.env.DATABASE_CONNECTION_TIME_OUT),
    extra: {
      connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT),
    },
    entities: ['dist/database/entity/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    subscribers: ['dist/database/observers/subscribers/*.subscriber{.ts,.js}'],
    cli: {
      entitiesDir: 'src/database/entity',
      migrationsDir: 'src/database/migrations',
      subscribersDir: 'src/database/observers/subscribers',
    },
  };
}
