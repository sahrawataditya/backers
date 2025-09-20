import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(200)
  async getPosts(): Promise<SuccessResponse> {
    try {
      const posts = await this.postsService.posts({});
      if (posts.length > 0) {
        return {
          message: 'Posts found successfully',
          success: true,
          data: posts,
        };
      } else {
        return {
          message: 'No posts found',
          success: true,
          data: [],
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post('create')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Body() postData: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<SuccessResponse> {
    try {
      const post = await this.postsService.createPost(postData, file);
      return {
        message: 'Post created successfully',
        success: true,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
