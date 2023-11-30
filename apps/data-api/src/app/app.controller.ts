import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getData() {
    return {
      message: 'Hello API',
      endpoints: [
        { post: ['/', '/create', '/:tag', '/:id', '/:id/update', '/:id/delete'] },
        { user: ['/', '/create', '/:id', '/:id/update', '/:id/delete'] },
        { reaction: ['/', '/create', '/:id', '/:id/update', '/:id/delete'] }

      ]
    };
  }
}
