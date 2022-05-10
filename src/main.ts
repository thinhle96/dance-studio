import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import {ValidationPipe} from '@nestjs/common';
import {LoggingInterceptor} from './interceptor/logging.interceptor';
import {TransformInterceptor} from './interceptor/transform.interceptor';
import {RolesGuard} from './core/services/auth/roles.guard';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        new TransformInterceptor(),
    );
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalGuards(new RolesGuard(new Reflector()));
    const port = process.env.SERVER_PORT;

    const config = new DocumentBuilder()
        .setTitle('DanceStudio')
        .addBearerAuth({
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
        })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    // fs.writeFileSync('./monexcore-docs.yaml', yaml.stringify(document));

    SwaggerModule.setup('api', app, document);

    await app.listen(port);

    console.log('App listen on PORT: ' + port);
}

bootstrap();
