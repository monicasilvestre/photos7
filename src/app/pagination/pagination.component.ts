import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() numberOfElements: number;
  @Input() currentPage: number;
  @Output() navigate = new EventEmitter<number>();

  previousPage(): void {
    this.navigate.emit(this.currentPage-1);
  };

  nextPage(): void {
    this.navigate.emit(this.currentPage+1);
  };
}
