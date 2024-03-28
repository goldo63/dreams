import { Id, ITags, ReadAbility } from '@dreams/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema()
export class Tag implements ITags {
    @IsMongoId()
    id!: number;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    color!: string;

    @Prop({ type: SchemaTypes.ObjectId, required: true })
    posterId!: Id;
}

export const TagSchema = SchemaFactory.createForClass(Tag);