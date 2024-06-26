import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post as PostModel, PostSchema } from './post/post.schema';
import { User as UserModel, UserSchema } from './user/user.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PostModel.name, schema: PostSchema },
            { name: UserModel.name, schema: UserSchema },
        ]),
    ],
    controllers: [PostController, UserController],
    providers: [PostService, UserService],
    exports: [PostService, UserService],
})
export class FeatureModule {}
