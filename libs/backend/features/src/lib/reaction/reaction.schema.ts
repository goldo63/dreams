import { Id, IReaction, ITags, ReadAbility } from '@dreams/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';

export type ReactionDocument = Reaction & Document;

@Schema()
export class Reaction implements IReaction {
    @IsMongoId()
    id!: number;

    @Prop({ required: true })
    isPositiveVote!: boolean;

    @Prop({ required: true })
    Context!: string;

    @Prop({ required: true, default: Date.now })
    ReactionDate!: Date;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);