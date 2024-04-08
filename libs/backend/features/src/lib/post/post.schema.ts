import { Id, IPost, IReaction, ITags, ReadAbility } from '@dreams/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ReactionSchema } from '../postDetails/reaction.schema';
import { v4 as uuid } from 'uuid';

export type PostDocument = Post & Document;

@Schema()
export class Post implements IPost {
    @Prop({default: uuid, index: true})
    id!: string;

    @Prop({ default: uuid }) // Use uuid for posterId
    posterId!: string;

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
    tags?: ITags[];

    @Prop({ type: [ReactionSchema], default: [], required: false })
    reactions?: IReaction[];
}

export const PostSchema = SchemaFactory.createForClass(Post);