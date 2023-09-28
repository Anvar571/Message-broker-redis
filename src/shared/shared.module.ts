import { Module, } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { CacheOptions } from "./configs/redis.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      useClass: CacheOptions,
    }),
  ],
  providers: []
})
export class SharedModule {}