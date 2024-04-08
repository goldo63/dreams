import { Component, Input } from '@angular/core';
import { ITags } from '@dreams/shared/models';

@Component({
  selector: 'dreams-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {
  @Input() tags: ITags[] = [];

}
