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
  tasks: KanbanTask[];
  taskSequence: number;

  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.taskRegister = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.tasks = [];
    this.taskSequence = 0;
  }

  addTask(): void{
    if(this.taskRegister.valid){
      let task: KanbanTask = new KanbanTask(++this.taskSequence, this.taskRegister.value['taskName'], 'to-do');
      this.tasks.push(task);
      this.taskRegister.reset();
    }
  }

}
