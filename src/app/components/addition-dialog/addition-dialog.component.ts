import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addition-dialog',
  templateUrl: './addition-dialog.component.html',
  styleUrls: ['./addition-dialog.component.css']
})
export class AdditionDialogComponent implements OnInit {

  public addRegister!: FormGroup;
  public itemCategory!: string;

  constructor(public dialogRef: MatDialogRef<AdditionDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {itemCategory: string}) { }

  ngOnInit(): void {
    this.itemCategory = this.data.itemCategory as string;
    this.addRegister = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

}
