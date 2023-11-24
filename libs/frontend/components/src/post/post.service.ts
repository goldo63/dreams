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
          imgUrl: 'https://www.treehugger.com/thmb/JXTBJVs9v7Xt3meY8Xg5B6mE91U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__treehugger__images__2019__09__cloud-0693b27e05ee4a1c802182da4aa117a9.jpg',
          videoUrl: 'https://www.w3schools.com/html/movie.mp4',
          content: `
          <p>This is a great day! 🚀 #Excited</p>
          <p>Check out this <strong>awesome</strong> achievement:</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
          <p>Here's an image of my dream:</p>
          <img src="https://www.treehugger.com/thmb/JXTBJVs9v7Xt3meY8Xg5B6mE91U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__treehugger__images__2019__09__cloud-0693b27e05ee4a1c802182da4aa117a9.jpg" alt="Awesome Image">
        `,
          readAbility: ReadAbility.public,
        },
        {
          id: 1,
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