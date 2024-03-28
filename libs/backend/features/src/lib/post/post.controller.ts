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

@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(private postService: PostService) {}

  @Get('')
  async getAll(): Promise<IPost[]> {
    return this.postService.getAllpublic();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<IPost | null> {
    const result = this.postService.getById(id);

    if (!(await result)) throw new NotFoundException(`Post with id ${id} not found`);
    return result;
  }

  @Delete(':id')
  async deletePostById(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const result = await this.postService.deleteById(id);

    if (result.deletedCount === 0) throw new NotFoundException(`Post with id ${id} not found`);
    (res as any).status(200).json({ message: 'Post by id of ${id} deleted successfully' });
  }
  
  @Post(':id/tags')
  async addTags(@Param('id') id: number, @Res() res: Response, @Body() tags: ITags[]): Promise<void> {
    const result = this.postService.setTags(id, tags)

    if(result == null) throw new NotFoundException(`Post by id ${id} not found`);
    (res as any).status(200).json({ message: 'Tags set successfully' });
  }

  @Post(':id/reactions')
  async addReaction(@Param('id') id: number, @Res() res: Response, @Body() reaction: IReaction): Promise<void> {
    const result = this.postService.addReaction(id, reaction);

    if(result == null) throw new NotFoundException(`Post by id ${id} not found`);
    (res as any).status(200).json({ message: 'Reaction added successfully' });
  }

  @Post(':id/subreactions')
  async addSubReaction(@Param('id') id: number, @Param('reactionid') reactionId: number, @Res() res: Response, @Body() reaction: IReaction): Promise<void> {
    const result = this.postService.addSubReaction(id, reactionId, reaction);

    if(result == null) throw new NotFoundException(`Post by id ${id} or reaction by id ${reactionId} not found`);
    (res as any).status(200).json({ message: 'Subreaction added successfully' });
  }
}
