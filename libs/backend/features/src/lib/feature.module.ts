import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

@Module({
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService]
})
export class FeatureModule {}
