import { Injectable } from '@angular/core';
import { IPost, ReadAbility, ApiResponse } from '@dreams/shared/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, filter, from, map, of, take, tap, throwError } from 'rxjs';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
    providedIn: 'root',
})
export class PostService {

  endpoint = 'http://localhost:3000/api/post';
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
          <p>Let's share recipes, cooking tips, and create delicious meals together!</p>
          <img src="https://example.com/cooking-class-kitchen.jpg" alt="Cooking Class Kitchen">
        `,
        readAbility: ReadAbility.public,
      },
    ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly http: HttpClient) {}

  public getAllpublic(options?: any): Observable<IPost[]> {
    console.log(`list ${this.endpoint}`);

    return this.http
        .get<ApiResponse<IPost[]>>(this.endpoint, {
            ...options,
            ...httpOptions,
        })
        .pipe(
            tap(console.log),
            map((response: any) => response.results as IPost[]),
            catchError(this.handleError)
        );
  }
  

  getById(id: number | null, options?: any): Observable<IPost> {
    if (id === null) return this.handleError('ID is null');

    const url = `${this.endpoint}/${id}`;
    
    console.log(`read ${url}`);
    
    return this.http
        .get<ApiResponse<IPost>>(url, {
            ...options,
            ...httpOptions,
        })
        .pipe(
            map((response: any) => response.results as IPost),
            catchError(this.handleError)
        );
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

  private handleError(error: any): Observable<never> {
    //console.error('Error occurred:', error);

    return throwError(() => new Error(error.message));
  }
}
