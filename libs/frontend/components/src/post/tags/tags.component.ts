import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITags } from '@dreams/shared/models';

@Component({
  selector: 'dreams-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {
  @Input() tags: ITags[] = [];
  @Output() tagClicked: EventEmitter<ITags> = new EventEmitter<ITags>();

  onTagClicked(tag: ITags): void {
    this.tagClicked.emit(tag);
  }
}
