import { KanbanTask } from './../kanbanTask';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  public taskRegister: FormGroup;
  taskList: KanbanTask[];
  todoList: KanbanTask[];
  doingList: KanbanTask[];
  doneList: KanbanTask[];
  itemStatus: string[];
  taskSequence: number;

  constructor(private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.itemStatus = ['to-do', 'doing', 'done'];
    this.taskRegister = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.taskList = [];
    this.todoList = [];
    this.doingList = [];
    this.doneList = [];
    this.taskSequence = this.getIndex();
    this.retrieveList();
  }

  addTask(): void{
    if(this.taskRegister.valid){
      let task: KanbanTask = new KanbanTask(++this.taskSequence, this.taskRegister.value['taskName'], 'to-do');
      this.taskList.push(task);
      this.taskRegister.reset();
      this.setTasks();
      this.saveTask(task);
      this.incIndex();
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

  deleteTask($event: any): void{
    try{
      const deleteId: number = $event as number;
      let previousTasks: string | null = localStorage.getItem('taskList');
      if(previousTasks === null){
        previousTasks = "[]";
      }
      else{
        let currentTasks = JSON.parse(previousTasks) as KanbanTask[];
        currentTasks.splice(currentTasks.findIndex(item => item.id == deleteId), 1);
        this.taskList.splice(this.taskList.findIndex(item => item.id == deleteId), 1);
        localStorage.setItem('taskList', JSON.stringify(currentTasks));
      }
    }
    catch(error){
      console.log(error);
    }
  }

  updateStatus($event: any): void{
    try{
      const task = $event as KanbanTask;
      let previousTasks: string | null = localStorage.getItem('taskList');
      if(previousTasks === null){
        previousTasks = "[]";
      }
      else{
        let currentTasks = JSON.parse(previousTasks) as KanbanTask[];
        currentTasks[currentTasks.findIndex(item => (item.id == task.id))].status = task.status;
        localStorage.setItem('taskList', JSON.stringify(currentTasks));
      }
    }
    catch(error){
      console.log(error);
    }
  }

  private retrieveList(): void{
    try{
      let savedList: string | null = localStorage.getItem('taskList');
      if(savedList === null){
        savedList = "[]";
      }
      this.taskList = savedList === "[]" ? [] : JSON.parse(savedList) as KanbanTask[];
      if(this.taskList.length > 0){
        this.setTasks();
      }
    }
    catch(error){
      console.log(error);
    }
  }

  private getIndex(): number{
    let numSeq: number = 0;
    try{
      let seqIndex: string | null = localStorage.getItem('taskSequence');
      if(seqIndex !== null){
        numSeq = parseInt(seqIndex);
      }
      else{
        localStorage.setItem('taskSequence', '0');
      }
    }
    catch(error){
      console.log(error);
    }
    return numSeq;
  }

  private incIndex(): void{
    try{
      let numSeq: number;
      let seqIndex: string | null = localStorage.getItem('taskSequence');
      if(seqIndex !== null){
        numSeq = parseInt(seqIndex);
        numSeq++;
        localStorage.setItem('taskSequence', numSeq.toString());
      }
    }
    catch(error){
      console.log(error);
    }
  }
}
