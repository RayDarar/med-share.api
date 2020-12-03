import { DynamicModule, Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";

@Global()
@Module({
  providers: [DatabaseService],
})
export class DatabaseModule {
  public static registerAsync(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: DatabaseService.name,
          async useFactory() {
            const service = new DatabaseService();
            await service.init();
            return service;
          },
        },
      ],
      exports: [DatabaseService],
    };
  }
}
