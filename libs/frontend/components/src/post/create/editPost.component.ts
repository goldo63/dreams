import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost, ReadAbility, ReadAbilityMapping } from '@dreams/shared/models';
import { PostService } from '../post.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'dreams-edit-post',
  templateUrl: './editPost.component.html',
  styleUrls: ['./editPost.component.css'],
})
export class EditPostComponent implements OnInit {
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ],
  };
  post: IPost = {
    id: '0',
    posterId: '0', // Assuming posterId is of type number, please adjust accordingly
    postDate: new Date(),
    title: '',
    imgUrl: '',
    videoUrl: '',
    content: '',
    readAbility: ReadAbility.public, // Adjust the type accordingly
  };
  updatingPost = false;

  public ReadAbilityMapping = ReadAbilityMapping;
  public readAbilityTypes: ReadAbility[] = Object.values(ReadAbility).filter(value => typeof value === 'number') as ReadAbility[];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          if (params.get('id')) {
            this.updatingPost = true;
            return this.postService.getById(params.get('id'));
          } else {
            this.updatingPost = false;
            return of(this.post);
          }
        })
      )
      .subscribe((post: IPost) => {
        this.post = post;
      });
  }

  onSubmit(): void {
    this.post.readAbility = +this.post.readAbility;
    if (this.updatingPost) {
      this.postService.update(this.post).subscribe((result) => {
        console.log('Result: ' + JSON.stringify(result));
        this.router.navigate(['item/post']);
      });
    } else {
      this.postService.create(this.post).subscribe((result) => {
        console.log('Result: ' + JSON.stringify(result));
        this.router.navigate(['item/post']);
      });
    }
  }

  getEnumKeys(enumObj: any): string[] {
    return Object.keys(enumObj).filter(key => isNaN(Number(enumObj[key])));
  }
}
