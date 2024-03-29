import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IPost, IReaction, ITags, ReadAbility } from '@dreams/shared/models';
import { Post as PostModel, PostDocument } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaction } from '../postDetails/reaction.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostService {
  private readonly logger: Logger = new Logger(PostService.name);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel(PostModel.name) private postModel: Model<PostDocument>
  ) {}

  async getAllpublic(): Promise<IPost[]> {
    this.logger.log(`Finding all public posts`);

    const items = await this.postModel
      .find({ readAbility: 2 }) // 2 = public
      .populate('reactions')
      .exec();
    return items;
  }

  async getById(id: string): Promise<IPost | null> {
    this.logger.log(`Finding post by id ${id}`);

    const item = await this.postModel.findOne({ id: id }).exec();

    if (!item) return null;
    return item;
  }

  async getByTag(tagname: string): Promise<IPost[]> {
    this.logger.log(`Finding post with tags ${tagname}`);
    const items = await this.postModel
      .find({ tags: { $elemMatch: { name: tagname } } })
      .exec();
    return items;
  }

  async create(user_id: string, post: IPost): Promise<IPost | null> {
    if (post && user_id) {
      this.logger.log(`Create post ${post.title}`);
      return this.postModel.create(post);
    }
    return null;
  }

  async update(_id: string, post: IPost): Promise<IPost | null> {
    this.logger.log(`Update post ${post.title}`);
    return this.postModel.findByIdAndUpdate({ _id }, post);
  }

  async deleteById(id: string): Promise<{ deletedCount: number }> {
    this.logger.log(`Deleting post by ID: ${id}`);
    const result = await this.postModel
      .deleteOne({ id: +id })
      .exec();

    return result;
  }

  async setTags(meetupId: string, tags: ITags[]): Promise<IPost | null> {
    const meetup = await this.postModel.findOne({ id: +meetupId }).exec();
    if(meetup == null) return null;

    this.logger.log(`Setting tags of values ${tags.forEach(tag => tag.name)}`);
    meetup.tags = tags;

    return meetup.save();
  }

  //==========REACTIONS===========
  async addReaction(meetupId: string, reaction: IReaction): Promise<IPost | null> {
    const meetup = await this.postModel.findOne({ id: meetupId }).exec();
  
    if(meetup == null) return null;
    

    this.logger.log(`Adding reaction ${reaction.Context}`);

    if(meetup.reactions == null || meetup.reactions == undefined){ 
      meetup.reactions = new Array<IReaction>();
    }
    console.log(meetup.reactions);
    meetup.reactions.push(reaction);

    //meetup.markModified('reactions');
    return meetup.save();
  }

  async addSubReaction(meetupId: string, reactionId: string, reactionToAdd: IReaction): Promise<IPost | null> {
    const meetup = await this.postModel.findOne({ id: meetupId }).exec();
    if (!meetup) {
      this.logger.error(`Meetup with id ${meetupId} not found.`);
      return null;
    }
  
    this.logger.log(`Adding reaction ${reactionToAdd.Context} to reaction ${reactionId}`);
  
    if (!meetup.reactions || meetup.reactions.length === 0) {
      this.logger.error(`Meetup with id ${meetupId} has no reactions.`);
      return null;
    }
  
    const foundReaction = this.findReactionById(meetup.reactions, reactionId);
    if (!foundReaction) {
      this.logger.error(`Reaction with id ${reactionId} not found in meetup ${meetupId}.`);
      return null;
    }
  
    this.addReactionToFoundReaction(foundReaction, reactionToAdd);
    
    // Update the meetup's reactions with the modified reactions
    meetup.markModified('reactions');
    
    await meetup.save();
    return meetup;
  }
  
  private findReactionById(reactions: IReaction[], reactionId: string): IReaction | null {
    this.logger.log(reactions);
    for (const reaction of reactions) {
      if (reaction.id === reactionId) {
        return reaction;
      }
      if (reaction.reactions && reaction.reactions.length > 0) {
        const foundReaction = this.findReactionById(reaction.reactions, reactionId);
        if (foundReaction) {
          return foundReaction;
        }
      }
    }
    return null;
  }
  
  private addReactionToFoundReaction(reaction: IReaction, reactionToAdd: IReaction): void {
    reactionToAdd.id = uuid();
    reactionToAdd.reactions = [];
    if (reaction.reactions == null) reaction.reactions = [];
    reaction.reactions.push(reactionToAdd);
  }
}
