import { Module } from "@nestjs/common";
import { SearchStoresController } from "./controllers/search-stores.controller";
import { SearchStoresService } from "./services/search-stores.service";

@Module({
  controllers: [SearchStoresController],
  providers: [SearchStoresService],
})
export class StoresModule {}
