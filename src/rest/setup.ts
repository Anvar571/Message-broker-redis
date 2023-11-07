import { INestApplication, ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export function setupConfig(app: INestApplication) {
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
          excludeExtraneousValues: true,
      }),
  );

  app.useGlobalPipes(
      new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidUnknownValues: true,
      }),
  );
}