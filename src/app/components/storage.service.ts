import { KanbanTask } from './kanbanTask';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly taskListKey: string = 'taskList';
  private readonly taskSequenceKey: string = 'taskSequence';

  constructor() { }

  private setTasks(tasks: string): void{
    try{
      localStorage.setItem(this.taskListKey, tasks);
    }
    catch(error){
      console.log(error);
    }
  }

  retrieveAllTasks(): KanbanTask[]{
    let newList: KanbanTask[] = [];
    let previousList: string | null = localStorage.getItem(this.taskListKey);
    if(previousList === null){
      this.setTasks('[]');
    }
    else{
      try{
        newList = JSON.parse(previousList) as KanbanTask[];
      }
      catch(error){
        console.log(error);
      }
    }
    return newList;
  }

  retrieveTasksByStatus(status: string): KanbanTask[]{
    let newList: KanbanTask[] = [];
    let previousList: string | null = localStorage.getItem(this.taskListKey);
    if(previousList === null){
      this.setTasks('[]');
    }
    else{
      try{
        let currentList = JSON.parse(previousList) as KanbanTask[];
        newList = currentList.filter((task) => task.status == status);
      }
      catch(error){
        console.log(error);
      }
    }
    return newList;
  }

  getSequence(): number{
    let seq: number = 0;
    try{
      const receivedSeq: string | null = localStorage.getItem(this.taskSequenceKey);
      if(receivedSeq !== null){
        if(receivedSeq !== ''){
          seq = parseInt(receivedSeq) + 1;
        }
        else{
          seq++;
        }
      }
      this.setSequence(seq);
    }
    catch(error){
      console.log(error);
    }
    return seq;
  }

  private setSequence(seq: number): void{
    try{
      localStorage.setItem(this.taskSequenceKey, seq.toString());
    }
    catch(error){
      console.log(error);
    }
  }

  saveTask(task: KanbanTask): void{
    try{
      let savedList: KanbanTask[] = this.retrieveAllTasks();
      savedList.push(task);
      this.setTasks(JSON.stringify(savedList));
    }
    catch(error){
      console.log(error);
    }
  }

  updateTaskStatus(task: KanbanTask): void{
    try{
      let savedList: KanbanTask[] = this.retrieveAllTasks();
      savedList[savedList.findIndex(item => (item.id == task.id))].status = task.status;
      this.setTasks(JSON.stringify(savedList));
    }
    catch(error){
      console.log(error);
    }
  }

  deleteTaskById(deleteId: number): void{
    try{
      let savedList: KanbanTask[] = this.retrieveAllTasks();
      savedList.splice((savedList.findIndex(item => item.id == deleteId)), 1);
      this.setTasks(JSON.stringify(savedList));
    }
    catch(error){
      console.log(error);
    }
  }
}
