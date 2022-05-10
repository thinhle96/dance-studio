import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppService} from './app.service';
import {DatabaseConfig} from './core/configuration/DatabaseConfig';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RedisMiddleware} from './middleware/redis.middleware';
import {ConfigModule} from '@nestjs/config';
import config from './index';
import {AppServiceModule} from './services/app-service.module';
import {CoreModule} from './core/core.module';


@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [config]}),
        TypeOrmModule.forRoot(DatabaseConfig()),
        CoreModule,
        AppServiceModule,
    ],
    providers: [AppService],
})
export class AppModule {
    constructor() {
    }

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RedisMiddleware)
            .forRoutes({path: '', method: RequestMethod.ALL});
    }
}
