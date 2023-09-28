import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupConfig } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupConfig(app);

    const config = new DocumentBuilder()
        .setTitle('E - navbat prokect')
        .setDescription('Test ')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);

    await app.listen(3000);
}
bootstrap();
