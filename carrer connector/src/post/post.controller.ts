import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { post as PostEntity } from './post.entity';

@Controller('post')
export class PostController {
    constructor(private readonly postService:PostService){}
     @Post('create/:userId')
     async createPost(@Body() createPostDto:CreatePostDto , @Param('userId') userId:number,):Promise<PostEntity>{
        return this.postService.createPost(createPostDto,userId)
     }
    @Get('all')
        async getAllPosts(): Promise<PostEntity[]>{
            return this.postService.getAllPosts()
        }

}
