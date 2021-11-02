import { TaskList } from './../../models/task-list';
import { KanbanTask } from '../../models/kanbanTask';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AdditionDialogComponent } from '../addition-dialog/addition-dialog.component';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {

  @Input() list!: TaskList;
  @Output() onSwap: EventEmitter<KanbanTask> = new EventEmitter();
  @Output() onAddTask: EventEmitter<string> = new EventEmitter();
  @Output() onDeleteList: EventEmitter<string> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<string> = new EventEmitter();

  constructor(public dialog: MatDialog, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  removeTask($event: any): void{
    const taskId = $event.taskId as number;
    const listId = $event.listId as number;
    this.list.tasks.splice(listId, 1);
    this.onDeleteTask.emit();
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
    }
    this.onSwap.emit();
  }

  addTask(): void{
    const addDialog = this.dialog.open(AdditionDialogComponent, {
      width: '20rem',
      data: {itemCategory: 'tarefa'}
    });
    addDialog.afterClosed().subscribe(result => {
      if(result){
        const newTaskName = result.itemName as string;
        const valid = result.valid as boolean;
        if(valid){
          const newTask: KanbanTask = {
            id: this.storageService.getSequence(),
            description: newTaskName,
            status: this.list.listName
          };
          this.list.tasks.push(newTask);
          this.onAddTask.emit();
        }
      }
    });
  }

  deleteList(){
    this.onDeleteList.emit(this.list.listName);
  }

}
