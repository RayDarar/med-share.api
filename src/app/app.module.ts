import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { MedicinesModule } from "src/medicines/medicines.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [DatabaseModule.registerAsync(), MedicinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
