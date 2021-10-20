import { KanbanTask } from '../kanbanTask';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

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
    }
  }
  
  setTasks(): void{
    this.todoTasks = this.generalTasks.filter(task => task.status == 'to-do');
    this.doingTasks = this.generalTasks.filter(task => task.status == 'doing');
    this.doneTasks = this.generalTasks.filter(task => task.status == 'done');
    this.generalTasks = [];
  }

  deleteTask(task: KanbanTask, index: number): void{
    if(task.status == 'to-do'){
      this.todoTasks.splice(index, 1);
    }
    else if(task.status == 'doing'){
      this.doingTasks.splice(index, 1);
    }
    else if(task.status == 'done'){
      this.doneTasks.splice(index, 1);
    }
  }

}
