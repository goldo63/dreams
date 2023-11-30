import { Controller, Get, Logger } from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from '@dreams/shared/models';

@Controller('post')
export class PostController {
    private readonly logger = new Logger(PostController.name);

    constructor(private postService: PostService) {}

    @Get('')
    getAll(): Promise<IPost[]> {
        return this.postService.getAllpublic();
    }
}
