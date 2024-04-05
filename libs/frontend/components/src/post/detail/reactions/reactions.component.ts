import { Component, Input } from '@angular/core';
import { IReaction } from '@dreams/shared/models';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.css']
})
export class ReactionsComponent {
  @Input() reactions!: IReaction[];
}