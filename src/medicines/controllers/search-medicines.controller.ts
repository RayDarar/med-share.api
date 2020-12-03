import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
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

  @Get("/")
  public searchMedicines(
    @Query("query") query: string,
    @Query("offset") offset: number
  ) {
    if (!query) {
      throw new BadRequestException("Not enough parameters");
    }
    return this.service.searchMedicines(query, offset || 0);
  }

  @Get("/:id")
  public getMedicine(@Param("id", ParseIntPipe) id: number) {
    return this.service.getMedicine(id);
  }
}
