import { BullRootModuleOptions, SharedBullConfigurationFactory } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BullSharedOptions implements SharedBullConfigurationFactory {
  constructor(private configService: ConfigService) {}

  createSharedConfiguration():
    | Promise<BullRootModuleOptions>
    | BullRootModuleOptions {
    return {
      redis: {
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
        password: this.configService.get('REDIS_PASSWORD'),
      },
    } as BullRootModuleOptions;
  }
}