import { Component, Input } from '@angular/core';
import { IAccount, IReaction } from '@dreams/shared/models';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.css']
})
export class ReactionsComponent {
  @Input() reactions!: IReaction[];
  selectedReactionIndex: number | null = null;
  newReactionContent = '';
  newReactionIsPositive = true; // Default to positive review

  user: IAccount | undefined;
  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.user = this.userService.getById(this.reaction.id);
  }

  showReact(index: number): void {
    this.selectedReactionIndex = index; // Set the index of the selected reaction
  }

  submitReaction(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior

    // Here you can handle the submission of the new reaction
    console.log('New Reaction Content:', this.newReactionContent);
    console.log('Is Positive Review:', this.newReactionIsPositive);

    // Optionally, you can reset the input fields after submission
    this.newReactionContent = '';
    this.newReactionIsPositive = true; // Reset to default
    this.selectedReactionIndex = null; // Reset the selected reaction
  }
}