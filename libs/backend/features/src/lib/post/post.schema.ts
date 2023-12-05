import { IPost, ReadAbility } from '@dreams/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Id } from 'libs/shared/models/src/interfaces/id.interface';
import { Document, SchemaTypes } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post implements IPost {
    @IsMongoId()
    id!: number;

    @Prop({ type: SchemaTypes.ObjectId, required: true })
    posterId!: Id;

    @Prop({ required: true })
    postDate!: Date;

    @Prop({ required: true })
    title!: string;

    @Prop({ type: String, required: false })
    imgUrl?: string;

    @Prop({ type: String, required: false })
    videoUrl?: string;

    @Prop({ required: true })
    content!: string;

    @Prop({ type: Number, enum: ReadAbility, default: ReadAbility.private })
    readAbility!: ReadAbility;
}

export const PostSchema = SchemaFactory.createForClass(Post);