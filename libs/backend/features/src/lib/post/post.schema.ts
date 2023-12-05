import { ReadAbility } from '@dreams/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Post extends Document {
    @Prop({ type: SchemaTypes.ObjectId, required: true })
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
}

export const PostSchema = SchemaFactory.createForClass(Post);