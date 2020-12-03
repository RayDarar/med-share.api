import { Module } from "@nestjs/common";
import { SearchMedicinesController } from "./controllers/search-medicines.controller";
import { SearchMedicinesService } from "./services/search-medicines.service";

@Module({
  controllers: [SearchMedicinesController],
  providers: [SearchMedicinesService],
})
export class MedicinesModule {}
