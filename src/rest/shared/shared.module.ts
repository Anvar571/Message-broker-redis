import { Module, } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { CacheOptions } from "./configs/redis.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { KnexModule } from "nestjs-knex";
import { BullModule } from '@nestjs/bull';
import { BullSharedOptions } from "./configs/bull.config";
import { TodoProcessor } from "./processor/todo.processor";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      useClass: CacheOptions,
    }),
    BullModule.forRootAsync({
      useClass: BullSharedOptions
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          client: configService.get<string>('DB_CLIENT'),
          debug: configService.get<boolean>('DB_DEBUG'),
          connection: {
            host: configService.get<string>('DB_HOST'),
            user: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            port: configService.get<number>('DB_PORT'),
          },
        },
      }),
      inject: [ConfigService],
    })
  ],
  providers: [
    TodoProcessor
  ]
})
export class SharedModule { }