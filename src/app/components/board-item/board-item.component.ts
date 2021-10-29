import { KanbanTask } from './../kanbanTask';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {

  @Input() listStatusName!: string;
  @Input() taskList!: KanbanTask[];
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Output() onSwap: EventEmitter<KanbanTask> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  removeTask(task: KanbanTask, index: number): void{
    this.taskList.splice(index, 1);
    this.onDelete.emit(task.id);
  }

  swap(event: CdkDragDrop<KanbanTask[]>): void{
    //Move task inside an array
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    //move task from an array into another
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      //checks if new array is one of the arrays for tasks
      //changes the item's status to match the array
      event.container.data[event.currentIndex].status = event.container.id;
      const task = event.container.data[event.currentIndex];
      this.onSwap.emit(task);
    }
  }

}
