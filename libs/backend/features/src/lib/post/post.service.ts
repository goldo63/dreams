import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAccount, IPost, IReaction, ITags, IUser, ReadAbility } from '@dreams/shared/models';
import { Post as PostModel, PostDocument } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reaction } from '../postDetails/reaction.schema';
import { v4 as uuid } from 'uuid';
import { Neo4jService } from 'nest-neo4j';
import mongoose from 'mongoose';

@Injectable()
export class PostService {
  addTags(postId: string, tags: ITags[]) {
    throw new Error('Method not implemented.');
  }
  
  private readonly logger: Logger = new Logger(PostService.name);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel(PostModel.name) private postModel: Model<PostDocument>,
    private readonly neo4jService: Neo4jService
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

  async create(post: IPost): Promise<IPost | null> {
    post.id = uuid();
    if (post) {
      this.logger.log(`Create post ${post.title}`);
      return this.postModel.create(post);
    }
    return null;
  }

  async update(post: IPost): Promise<IPost | null> {
    this.logger.log(`Update post ${post.title}`);
    return this.postModel.findOneAndUpdate({ id: post.id }, post);
  }

  async deleteById(id: string): Promise<{ deletedCount: number }> {
    this.logger.log(`Deleting post by ID: ${id}`);
    const result = await this.postModel
      .deleteOne({ id: id })
      .exec();
    console.log(result);
    return result;
  }

  async setTags(postId: string, tags: ITags[]): Promise<IPost | null> {
    const post = await this.postModel.findOne({ id: postId }).exec();
    if(post == null) return null;

    this.logger.log(`Setting tags of values ${tags.forEach(tag => tag.name)}`);
    post.tags = tags;

    return post.save();
  }

  //==========REACTIONS===========
  async addReaction(userId: string, postId: string, reaction: IReaction): Promise<IPost | null> {
    const post = await this.postModel.findOne({ id: postId }).exec();
  
    if(post == null) return null;
    
    this.logger.log(`Adding reaction ${reaction.Context}`);

    if(post.reactions == null || post.reactions == undefined){ 
      post.reactions = new Array<IReaction>();
    }
    reaction.id = uuid();
    post.reactions.push(reaction);

    this.createRelation(userId, postId, reaction)
    return post.save();
  }

  async addSubReaction(userId: string, postId: string, reactionId: string, reactionToAdd: IReaction): Promise<IPost | null> {
    const post = await this.postModel.findOne({ id: postId }).exec();
    if (!post) {
      this.logger.error(`Post with id ${postId} not found.`);
      return null;
    }
  
    this.logger.log(`Adding reaction ${reactionToAdd.Context} to reaction ${reactionId}`);
  
    if (!post.reactions || post.reactions.length === 0) {
      this.logger.error(`Post with id ${postId} has no reactions.`);
      return null;
    }
  
    const foundReaction = this.findReactionById(post.reactions, reactionId);
    if (!foundReaction) {
      this.logger.error(`Reaction with id ${reactionId} not found in post ${postId}.`);
      return null;
    }
  
    this.addReactionToFoundReaction(foundReaction, reactionToAdd);
    
    // Update the post's reactions with the modified reactions
    post.markModified('reactions');
    this.createRelation(userId, postId, reactionToAdd);

    await post.save();
    return post;
  }
  
  private findReactionById(reactions: IReaction[], reactionId: string): IReaction | null {
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

  //==========NEO4J==========
  async createRelation(userid: string, postid: string, reaction: IReaction): Promise<void> {
    try {
        // Create user node
        await this.neo4jService.write(
            `MERGE (u:User {id: $userId})`,
            { userId: userid }
        );

        // Create reaction node
        await this.neo4jService.write(
            `MERGE (r:Reaction {id: $reactionId})`,
            { reactionId: reaction.id }
        );

        // Create post node
        await this.neo4jService.write(
            `MERGE (p:Post {id: $postId})`,
            { postId: postid }
        );

        // Create relationships
        await this.neo4jService.write(
            `MATCH (u:User {id: $userId}), (r:Reaction {id: $reactionId})
             CREATE (u)-[:REACTED]->(r)`,
            { userId: userid, reactionId: reaction.id }
        );

        await this.neo4jService.write(
            `MATCH (r:Reaction {id: $reactionId}), (p:Post {id: $postId})
             CREATE (r)-[:REACTED_TO]->(p)`,
            { reactionId: reaction.id, postId: postid }
        );

        this.logger.log('Relationships created successfully.');
    } catch (error) {
        this.logger.error(`Error creating relation: ${error}`);
        throw error;
    }
  }
  async getReactionsFromUser(userId: string): Promise<any[]> {
    try {
        const result = await this.neo4jService.read(
            `MATCH (u:User {id: $userId})-[:REACTED]->(r:Reaction)-[:REACTED_TO]->(p:Post)
             RETURN r, p.id AS postId`,
            { userId: userId }
        );

        return result.records.map(record => ({
            reactionId: record.get('r').properties.id,
            postId: record.get('postId')
        }));
    } catch (error) {
        this.logger.error(`Error reading reactions from user: ${error}`);
        throw error;
    }
  }

  async getPostFromReaction(reactionId: string): Promise<any> {
    try {
      const result = await this.neo4jService.read(
          `MATCH (r:Reaction {id: $reactionId})-[:REACTED_TO]->(p:Post)
           RETURN p.id AS postId`,
          { reactionId: reactionId }
      );
      return result.records[0].get('postId');
    } catch (error) {
      this.logger.error(`Error reading reactions from user: ${error}`);
      throw error;
    }
  }

  async getReaction(postId: string, reactionId: string): Promise<IReaction | null> {
    const post = await this.postModel.findOne({ id: postId }).exec();
    if (!post || !post.reactions) return null;

    const reaction = this.findReactionById(post.reactions, reactionId) as IReaction;
    if(!reaction) return null;

    return reaction;
  }

  async deleteReaction(postId: string, reactionId: string): Promise<boolean> {
    const post = await this.postModel.findOne({ id: postId }).exec();
    if (!post) {
        throw new NotFoundException('Post not found');
    }

    console.log(`Deleting reaction ${reactionId} from post ${postId}`);

    const deleteReactionRecursive = async (reactions: IReaction[]): Promise<boolean> => {
        for (let i = 0; i < reactions.length; i++) {
            const currentReaction = reactions[i];

            if (currentReaction.id === reactionId) { // Reaction found, remove it from the array
                
                reactions.splice(i, 1);

                post.markModified('reactions');
                await post.save();
                return true; 
            }

            if (currentReaction.reactions && currentReaction.reactions.length > 0) { //if nested continue recursively
                if (await deleteReactionRecursive(currentReaction.reactions)) {

                    return true;
                }
            }
        }

        return false;
    };

    // Call deleteReactionRecursive with the top-level reactions
    const isDeleted = deleteReactionRecursive(post.reactions as IReaction[]);
    if (await isDeleted) {
        return true; // Return true to indicate deletion success
    } else {
        throw new NotFoundException('Reaction not found');
    }
}
}
