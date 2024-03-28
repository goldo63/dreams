import { Id } from "./id.interface";

export interface IReaction {
    id: Id;
    isPositiveVote: boolean;
    Context: string;
    ReactionDate: Date;
}