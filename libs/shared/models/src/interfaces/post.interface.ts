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
    private,
    unlisted,
    public
}