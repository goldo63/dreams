import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAccount, IReaction } from '@dreams/shared/models';
import { UserService } from '../../../user/user.service';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.css']
})
export class ReactionsComponent {
  @Input() reactions!: IReaction[];
  @Input() postId!: string; 
  @Output() reactionSubmitted: EventEmitter<void> = new EventEmitter<void>();

  selectedReactionIndex: number | null = null;
  newReactionContent = '';
  newReactionIsPositive = true; // Default to positive review

  user: IAccount | undefined;
  

  constructor(private userService: UserService, private postService: PostService) {}

  ngOnInit(): void {
    // this.user = this.userService.getById(this.reaction.id);
    console.log(this.reactions);
  }

  showReact(index: number): void {
    this.selectedReactionIndex = index; // Set the index of the selected reaction
  }

  submitReaction(event: Event, postId: string, reactionId: string | null): void {
    event.preventDefault(); // Prevent the default form submission behavior

    const newReaction: IReaction = {
        id: '0',
        isPositiveVote: this.newReactionIsPositive,
        Context: this.newReactionContent,
        ReactionDate: new Date(),
        reactions: undefined
    };

    this.postService.react(postId, reactionId, newReaction)
      .subscribe(
        () => {
            // Optionally, you can handle a successful response here
            console.log('Reaction submitted successfully');
            this.handleReactionSubmitted();
            this.newReactionContent = '';
            this.newReactionIsPositive = true;
            this.selectedReactionIndex = null;
        },
        error => {
            // Optionally, you can handle errors here
            console.error('Failed to submit reaction:', error);
        }
      );
  }

  handleReactionSubmitted(): void {
    // Emit the event to notify the parent component
    this.reactionSubmitted.emit();
  }
}