import {
  Body,
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/global/guards/auth.guard";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostsActionService } from "../services/posts-action.service";

@Controller("/posts")
export class PostsActionController {
  @Inject(PostsActionService)
  private readonly service: PostsActionService;

  @UseGuards(new AuthGuard())
  @Post("/")
  public addPost(@Req() req, @Body() body: CreatePostDto) {
    return this.service.addPost(req.user.id, body);
  }

  @UseGuards(new AuthGuard())
  @Put("/:id/confirm")
  public confirmPost(@Param("id", ParseIntPipe) id: number) {
    return this.service.confirmPost(id);
  }

  @UseGuards(new AuthGuard())
  @Put("/:id/deny")
  public denyPost(@Param("id", ParseIntPipe) id: number) {
    return this.service.denyPost(id);
  }

  @UseGuards(new AuthGuard())
  @Put("/:id/archive")
  public archivePost(@Param("id", ParseIntPipe) id: number) {
    return this.service.archivePost(id);
  }
}
