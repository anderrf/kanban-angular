import { KanbanTask } from '../../models/kanbanTask';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task!: KanbanTask;
  @Input() listIndex!: number;
  @Output() onRemove: EventEmitter<{taskId: number, listId: number}> = new EventEmitter<{taskId: number, listId: number}>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  removeTask(){
    const removeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '20rem',
      data: {itemCategory: 'tarefa'}
    });
    removeDialog.afterClosed().subscribe(result => {
      if(result){
        const option = result.option as boolean;
        if(option){
          const taskId = this.task.id;
          const listId = this.listIndex;
          this.onRemove.emit({taskId, listId});
        }
      }
    });
  }

}
