import { Id } from "./id.interface";

export interface IPost {
    id: Id;
    posterId: Id;
    postDate: Date;
    title: string;
    imgUrl: string;
    videoUrl: string;
    content: string; //HTML string using quill
    readAbility: ReadAbility;
}

export enum ReadAbility {
    private = 0,
    unlisted = 1,
    public = 2
}

export const ReadAbilityMapping: Record<ReadAbility, string> = {
    [ReadAbility.private]: "Unlisted",
    [ReadAbility.unlisted]: "Private",
    [ReadAbility.public]: "Public"
};