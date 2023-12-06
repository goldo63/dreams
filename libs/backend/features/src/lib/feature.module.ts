import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post as PostModel, PostSchema } from './post/post.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PostModel.name, schema: PostSchema },
        ]),
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService]
})
export class FeatureModule {}
