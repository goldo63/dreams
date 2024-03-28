import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IPost, IReaction, ITags, ReadAbility } from '@dreams/shared/models';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  filter,
  from,
  map,
  of,
  take,
} from 'rxjs';
import { Post as PostModel, PostDocument } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaction } from '../postDetails/reaction.schema';

@Injectable()
export class PostService {
  private readonly logger: Logger = new Logger(PostService.name);
  private posts: IPost[] = [
    {
      id: 0,
      posterId: 1,
      postDate: new Date(),
      title: 'Help with Sustainable Agriculture Project',
      imgUrl: 'https://example.com/agriculture.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example',
      content: `
          <p>Hello dreamers! 👋</p>
          <p>I'm working on a sustainable agriculture project and could use some help.</p>
          <p>Key goals include:</p>
          <ul>
            <li>Implementing eco-friendly farming practices</li>
            <li>Reducing environmental impact</li>
            <li>Providing healthy, locally sourced produce</li>
          </ul>
          <p>If you have expertise in agriculture or sustainability, I'd love to connect!</p>
          <img src="https://example.com/agriculture-field.jpg" alt="Agriculture Field">
        `,
      readAbility: ReadAbility.public,
    },
    {
      id: 1,
      posterId: 2,
      postDate: new Date(),
      title: 'Community Art Mural Project',
      imgUrl: 'https://example.com/art-mural.jpg',
      videoUrl: '',
      content: `
          <p>Hi everyone! 🎨</p>
          <p>I'm organizing a community art mural project in our neighborhood.</p>
          <p>Let's come together to create something beautiful that reflects the spirit of our community.</p>
          <p>No art experience needed – just enthusiasm and a love for creativity!</p>
          <img src="https://example.com/community-mural.jpg" alt="Community Art Mural">
        `,
      readAbility: ReadAbility.public,
    },
    {
      id: 2,
      posterId: 3,
      postDate: new Date(),
      title: 'Tech Enthusiasts Wanted for Coding Project',
      imgUrl: '',
      videoUrl: 'https://www.youtube.com/watch?v=example',
      content: `
          <p>Hey coders! 💻</p>
          <p>I'm working on an open-source coding project and need collaborators.</p>
          <p>Our goal is to develop a useful tool for developers around the world.</p>
          <p>If you're passionate about coding and want to contribute, let's connect!</p>
        `,
      readAbility: ReadAbility.public,
    },
    {
      id: 3,
      posterId: 4,
      postDate: new Date(),
      title: 'Fitness Challenge: Join Me on the Journey!',
      imgUrl: 'https://example.com/fitness-challenge.jpg',
      videoUrl: '',
      content: `
          <p>Hey fitness enthusiasts! 💪</p>
          <p>I'm embarking on a fitness challenge to improve my health and well-being.</p>
          <p>Join me on this journey, share your fitness tips, and let's motivate each other!</p>
          <img src="https://example.com/fitness-journey.jpg" alt="Fitness Challenge">
        `,
      readAbility: ReadAbility.public,
    },
    {
      id: 4,
      posterId: 5,
      postDate: new Date(),
      title: 'Book Club: Exploring New Literary Worlds',
      imgUrl: 'https://example.com/book-club.jpg',
      videoUrl: '',
      content: `
          <p>Hello bookworms! 📚</p>
          <p>I'm starting a book club to explore new literary worlds and engage in meaningful discussions.</p>
          <p>If you're passionate about reading, join us for this exciting literary adventure!</p>
          <img src="https://example.com/book-club-meeting.jpg" alt="Book Club Meeting">
        `,
      readAbility: ReadAbility.public,
    },
    {
      id: 5,
      posterId: 6,
      postDate: new Date(),
      title: 'Cooking Class: Discover the Art of Culinary Delights',
      imgUrl: 'https://example.com/cooking-class.jpg',
      videoUrl: '',
      content: `
          <p>Foodies unite! 🍲</p>
          <p>I'm hosting a cooking class to explore the art of culinary delights.</p>
          <p>Let's share recipes, cooking tips, and create delicious posts together!</p>
          <img src="https://example.com/cooking-class-kitchen.jpg" alt="Cooking Class Kitchen">
        `,
      readAbility: ReadAbility.public,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectModel(PostModel.name) private postModel: Model<PostDocument>
  ) {}

  async getAllpublic(): Promise<IPost[]> {
    this.logger.log(`Finding all public posts`);

    const items = await this.postModel
      .find({ readAbility: 2 }) // 2 = public
      .exec();
    return items;
  }

  async getById(id: number): Promise<IPost | null> {
    this.logger.log(`Finding post by id ${id}`);

    const item = await this.postModel.findOne({ id: +id }).exec();

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

  async create(req: any): Promise<IPost | null> {
    const post = req.body;
    const user_id = req.user.user_id;

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

  async deleteById(id: number): Promise<{ deletedCount: number }> {
    this.logger.log(`Deleting post by ID: ${id}`);
    const result = await this.postModel
      .deleteOne({ id: +id })
      .exec();

    return result;
  }

  async setTags(meetupId: string, tags: ITags[]): Promise<IPost | null> {
    const meetup = await this.postModel.findOne({ id: meetupId }).exec();
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

    if(meetup.reactions == null) meetup.reactions = [];
    meetup.reactions.push(reaction);

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
    for (const reaction of reactions) {
      if (reaction.id === parseInt(reactionId)) {
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
    if (reaction.reactions == null) reaction.reactions = [];
    reaction.reactions.push(reactionToAdd);
  }
}
