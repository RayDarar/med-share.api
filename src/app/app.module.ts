import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { MedicinesModule } from "src/medicines/medicines.module";
import { StoresModule } from "src/stores/stores.module";
import { UsersModule } from "src/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    DatabaseModule.registerAsync(),
    MedicinesModule,
    StoresModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
