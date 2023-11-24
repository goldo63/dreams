import { Injectable } from '@angular/core';
import { IPost, ReadAbility } from '@dreams/shared/models';
import { BehaviorSubject, Observable, catchError, delay, filter, from, map, of, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private posts: IPost[] = [
        {
          id: 0,
          posterId: 0,
          postDate: new Date(),
          title: 'new post 1',
          imgUrl: 'http://',
          videoUrl: 'http://',
          content: 'new post content',
          readAbility: ReadAbility.public,
        },
      ];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    getAllpublic(): Observable<IPost[]> {
        return of(this.posts.filter(post => post.readAbility === ReadAbility.public));
    }

    getById(id: number): Observable<IPost> {
        return from(this.posts).pipe(
            filter((post) => post.id === id),
            take(1)
        )
    }

    create(post: IPost): Observable<IPost[]> {
        console.log('creating post');
        return of(post).pipe(
          map((newPost: IPost) => {
            this.posts.push(newPost);
            return this.posts;
          })
        );
    }

    update(post: IPost): Observable<IPost[]> {
        console.log('updating post');
        return of(post).pipe(
          map((updatedpost: IPost) => {
            const index = this.posts.findIndex(u => u.id === updatedpost.id);
            if (index !== -1) {
              this.posts[index] = updatedpost;
            }
      
            // Return the updated array
            return this.posts;
          })
        );
    }

    delete(id: number): Observable<IPost[]> {
        return of(id).pipe(
          map((deleteId: number) => {
            const index = this.posts.findIndex(post => post.id === deleteId);
      
            if (index !== -1) {
              this.posts.splice(index, 1);
            }
            else {
                console.log(`post with id ${deleteId} not found.`);
            }
      
            return this.posts;
          }),
        );
      }
}