import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { SearchStoresService } from "../services/search-stores.service";

@Controller("/stores")
export class SearchStoresController {
  @Inject(SearchStoresService)
  private readonly service: SearchStoresService;

  @Get("/autocomplete")
  public getAutocomplete(@Query("query") query: string) {
    if (!query) {
      throw new BadRequestException("Not enough parameters");
    }
    return this.service.getAutocomplete(query);
  }

  @Get("/")
  public searchStores(
    @Query("query") query: string,
    @Query("offset") offset: number
  ) {
    if (!query) {
      throw new BadRequestException("Not enough parameters");
    }
    return this.service.searchStores(query, offset || 0);
  }

  @Get("/by-drug-id/:id")
  public searchByDrugId(@Param("id", ParseIntPipe) id: number) {
    return this.service.searchByDrugId(id);
  }
}
