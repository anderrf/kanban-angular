import { KanbanTask } from './../kanbanTask';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  public taskRegister!: FormGroup;
  taskList!: KanbanTask[];
  todoList!: KanbanTask[];
  doingList!: KanbanTask[];
  doneList!: KanbanTask[];
  readonly itemStatus: string[] = ['to-do', 'doing', 'done'];

  constructor(private fb: FormBuilder, private storageService: StorageService) {
   }

  ngOnInit(): void {
    this.taskRegister = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.taskList = this.storageService.retrieveAllTasks();
    this.setTasks();
  }

  addTask(): void{
    if(this.taskRegister.valid){
      let task: KanbanTask = new KanbanTask(this.storageService.getSequence(), this.taskRegister.value['taskName'], 'to-do');
      this.taskList.push(task);
      this.taskRegister.reset();
      this.setTasks();
      this.storageService.saveTask(task);
    }
  }

  private setTasks(): void{
    this.todoList = this.taskList.filter(task => task.status == 'to-do');
    this.doingList = this.taskList.filter(task => task.status == 'doing');
    this.doneList = this.taskList.filter(task => task.status == 'done');
  }

  sendList(status: string): KanbanTask[]{
    let list: KanbanTask[];
    if(status === 'to-do'){
      list = this.todoList;
    }
    else if(status === 'doing'){
      list = this.doingList;
    }
    else if(status === 'done'){
      list = this.doneList;
    }
    else{
      list = [];
    }
    return list;
  }

  deleteTask($event: any): void{
    try{
      const deleteId: number = $event as number;
      this.taskList.splice(this.taskList.findIndex(item => item.id == deleteId), 1);
      this.storageService.deleteTaskById(deleteId);
    }
    catch(error){
      console.log(error);
    }
  }

  updateStatus($event: any): void{
    try{
      const task = $event as KanbanTask;
      this.storageService.updateTaskStatus(task);
    }
    catch(error){
      console.log(error);
    }
  }
}
