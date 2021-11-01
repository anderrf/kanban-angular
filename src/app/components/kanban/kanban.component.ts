import { TaskList } from './../../models/task-list';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AdditionDialogComponent } from '../addition-dialog/addition-dialog.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  taskLists!: TaskList[];

  constructor(private storageService: StorageService, public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.taskLists = [];
  }

  addBoard(): void{
    let listNames: string[] = [];
    this.taskLists.forEach((item) => {
      listNames.push(item.listName.toLowerCase());
    });
    const addDialog = this.dialog.open(AdditionDialogComponent, {
      width: '20rem',
      data: {itemCategory: 'lista'}
    });
    addDialog.afterClosed().subscribe(result => {
      if(result){
        const newListName = result.itemName as string;
        const valid = result.valid as boolean;
        if(valid){
          const newList: TaskList = {listName: newListName, tasks: []};
          this.taskLists.push(newList);
        }
      }
    });
  }

  removeList($event: any){
    const removedList = $event as string;
    this.taskLists.splice(this.taskLists.findIndex(list => list.listName == removedList), 1);
  }
}
