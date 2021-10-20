import { KanbanTask } from '../kanbanTask';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  public taskRegister: FormGroup;
  generalTasks: KanbanTask[];
  todoTasks: KanbanTask[];
  doingTasks: KanbanTask[];
  doneTasks: KanbanTask[];
  taskSequence: number;

  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.taskRegister = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.generalTasks = [];
    this.todoTasks = [];
    this.doingTasks = [];
    this.doneTasks = [];
    this.taskSequence = 0;
  }

  addTask(): void{
    if(this.taskRegister.valid){
      let task: KanbanTask = new KanbanTask(++this.taskSequence, this.taskRegister.value['taskName'], 'to-do');
      this.todoTasks.push(task);
      this.taskRegister.reset();
      this.saveTask(task);
    }
  }
  
  setTasks(): void{
    this.todoTasks = this.generalTasks.filter(task => task.status == 'to-do');
    this.doingTasks = this.generalTasks.filter(task => task.status == 'doing');
    this.doneTasks = this.generalTasks.filter(task => task.status == 'done');
  }

  removeTask(task: KanbanTask, index: number): void{
    if(task.status == 'to-do'){
      this.todoTasks.splice(index, 1);
    }
    else if(task.status == 'doing'){
      this.doingTasks.splice(index, 1);
    }
    else if(task.status == 'done'){
      this.doneTasks.splice(index, 1);
    }
    this.deleteTask(task);
  }

  swap(event: CdkDragDrop<KanbanTask[]>) {
    //Move task inside an array
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    //move task from an array into another
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      //checks if new array is one of the arrays for tasks
      //changes the item's status to match the array
      if(event.container.data === this.todoTasks){
        event.container.data[event.currentIndex].status = 'to-do';
      }
      else if(event.container.data === this.doingTasks){
        event.container.data[event.currentIndex].status = 'doing';
      }
      else if(event.container.data === this.doneTasks){
        event.container.data[event.currentIndex].status = 'done';
      }
    }
  }

  saveTask(task: KanbanTask): void{
    try{
      let previousTasks: string | null = localStorage.getItem('taskList');
      if(previousTasks === null){
        previousTasks = "[]";
      }
      let currentTasks = JSON.parse(previousTasks) as KanbanTask[];
      currentTasks.push(task)
      localStorage.setItem('taskList', JSON.stringify(currentTasks));
    }
    catch(error){
      console.log(error);
    }
  }

  deleteTask(task: KanbanTask): void{
    try{
      let previousTasks: string | null = localStorage.getItem('taskList');
      if(previousTasks === null){
        previousTasks = "[]";
      }
      let currentTasks = JSON.parse(previousTasks) as KanbanTask[];
      currentTasks.splice(currentTasks.findIndex(item => item.id === task.id), 1);
      localStorage.setItem('taskList', JSON.stringify(currentTasks));
    }
    catch(error){
      console.log(error);
    }
  }
}
