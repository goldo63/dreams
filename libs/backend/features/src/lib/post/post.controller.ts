import {
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from '@dreams/shared/models';

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

    if (result.deletedCount === 0) throw new NotFoundException(`Post with ID ${id} not found`);
    (res as any).status(200).json({ message: 'Post deleted successfully' });
  }
}
