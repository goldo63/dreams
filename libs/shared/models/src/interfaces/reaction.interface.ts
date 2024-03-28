import { Id } from "./id.interface";

export interface IReaction {
    id: Id;
    positiveVote: boolean;
    Context: string;
    ReactionDate: Date;
}