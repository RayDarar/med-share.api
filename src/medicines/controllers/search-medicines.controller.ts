import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from "@nestjs/common";
import { SearchMedicinesService } from "../services/search-medicines.service";

@Controller("/medicines")
export class SearchMedicinesController {
  @Inject(SearchMedicinesService)
  private readonly service: SearchMedicinesService;

  @Get("/autocomplete")
  public getAutocomplete(@Query("query") query: string) {
    if (!query) {
      throw new BadRequestException("Not enough parameters");
    }
    return this.service.getAutocomplete(query);
  }
}
