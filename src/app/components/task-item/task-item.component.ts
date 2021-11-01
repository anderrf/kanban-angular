import { KanbanTask } from '../../models/kanbanTask';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task!: KanbanTask;
  @Input() listIndex!: number;
  @Output() onRemove: EventEmitter<{taskId: number, listId: number}> = new EventEmitter<{taskId: number, listId: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  removeTask(){
    const taskId = this.task.id;
    const listId = this.listIndex;
    this.onRemove.emit({taskId, listId});
  }

}
