import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { IPost, IReaction, ITags } from '@dreams/shared/models';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { InjectToken, Token } from '../../../../auth/src/lib/token/token.decorator';

@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(private postService: PostService) {}

  @Get('')
  async getAll(): Promise<IPost[]> {
    return this.postService.getAllpublic();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IPost | null> {
    const result = this.postService.getById(id);

    if (!(await result)) throw new NotFoundException(`Post with id ${id} not found`);
    return result;
  }

  @Post(':id')
  async createPost(@Param('id') id: string, @Res() res: Response, @Body() post: IPost): Promise<void> {
    const result = await this.postService.create(id, post);
    if(result == null) throw new NotFoundException(`No post could be added`);
    (res as any).status(200).json({ message: `New post added by ${result.id}` });
  }

  @Delete(':id')
  async deletePostById(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const result = await this.postService.deleteById(id);

    if (result.deletedCount === 0) throw new NotFoundException(`Post with id ${id} not found`);
    (res as any).status(200).json({ message: 'Post by id of ${id} deleted successfully' });
  }

  @Post(':id/tags')
  async addTags(@Param('id') id: string, @Res() res: Response, @Body() tags: ITags[]): Promise<void> {
    const result = this.postService.setTags(id, tags)

    if(result == null) throw new NotFoundException(`Post by id ${id} not found`);
    (res as any).status(200).json({ message: 'Tags set successfully' });
  }

  @Post(':id/reactions')
  async addReaction(@InjectToken() token: Token, @Param('id') id: string, @Res() res: Response, @Body() reaction: IReaction): Promise<void> {
    const result = await this.postService.addReaction(token.id, id, reaction);

    if(result == null) throw new NotFoundException(`Post by id ${id} not found`);
    (res as any).status(200).json({ message: JSON.stringify(result) });
  }

  @Post(':id/subreactions/:reactionid')
  async addSubReaction(@InjectToken() token: Token, @Param('id') id: string, @Param('reactionid') reactionId: string, @Res() res: Response, @Body() reaction: IReaction): Promise<void> {
    const result = await this.postService.addSubReaction(token.id, id, reactionId, reaction);

    if(result == null) throw new NotFoundException(`Post by id ${id} or reaction by id ${reactionId} not found`);
    (res as any).status(200).json({ message: 'Subreaction added successfully' });
  }
}
