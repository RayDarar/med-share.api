import { Module } from "@nestjs/common";
import { PostsActionController } from "./controllers/posts-action.controller";
import { SearchPostsController } from "./controllers/search-posts.controller";
import { PostsActionService } from "./services/posts-action.service";
import { SearchPostsService } from "./services/search-posts.service";

@Module({
  controllers: [SearchPostsController, PostsActionController],
  providers: [SearchPostsService, PostsActionService],
})
export class PostsModule {}
