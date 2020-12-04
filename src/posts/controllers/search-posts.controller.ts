import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/global/guards/auth.guard";
import { SearchPostsService } from "../services/search-posts.service";

@Controller("/posts")
export class SearchPostsController {
  @Inject(SearchPostsService)
  private readonly service: SearchPostsService;

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
    return this.service.searchPosts(query, offset || 0);
  }

  @UseGuards(new AuthGuard())
  @Get("/my")
  public searchMyPosts(@Req() req) {
    return this.service.getMyPosts(req.user.id);
  }

  @UseGuards(new AuthGuard())
  @Get("/confirmation")
  public getConfirmationPosts() {
    return this.service.getConfirmationPosts();
  }
}
