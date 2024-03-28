import { Id, IPost, ITags, ReadAbility } from '@dreams/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
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

    @Prop({ required: false })
    tags!: ITags;

    @Prop({type: ReactionSchema, required: false})
    review: Reaction;
}

export const PostSchema = SchemaFactory.createForClass(Post);