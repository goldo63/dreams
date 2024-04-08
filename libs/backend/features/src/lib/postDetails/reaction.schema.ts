import { Id, IReaction, ITags, ReadAbility } from '@dreams/shared/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type ReactionDocument = Reaction & Document;

@Schema()
export class Reaction implements IReaction {
    
    @Prop({default: uuid, index: true})
    id!: string;

    @Prop({ required: true })
    isPositiveVote!: boolean;

    @Prop({ required: true })
    Context!: string;

    @Prop({ required: true, default: Date.now })
    ReactionDate!: Date;

    @Prop({ type: SchemaTypes.ObjectId, required: false })
    posterId!: Id;

    @Prop({ required: false, default: [] })
    reactions: IReaction[] | undefined;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);

