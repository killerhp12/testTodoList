import { toDo } from './model/todo';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {

  constructor(private formBuilder: FormBuilder,){}


  listTodo:Array<toDo> = [
    {
      id: 1,
      title: 'Angular',
      description: 'Học lập trình angular',
      dueDate: new Date('2020/10/15'),
      priority: 'low',
    },
    {
      id:2,
      title: 'odeJs',
      description: 'Học lập trình NodeJs',
      dueDate: new Date('2020/5/10'),
      priority: 'normal',
    },
    {
      id:3,
      title: 'PHP',
      description: 'Học lập trình PHP',
      dueDate: new Date('2020/10/10'),
      priority: 'high',
    },
  ];

  isShowModal:boolean = false;
  isAdd:boolean = false;
  todoForm: FormGroup;
  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, []),
      dueDate: new FormControl(null, []),
      priority: new FormControl(null, []),
    });
  }
  
  submitForm(e){
    for (const i in this.todoForm.controls) {
      this.todoForm.controls[i].markAsDirty();
      this.todoForm.controls[i].updateValueAndValidity();
    }
    console.log(this.todoForm);
  }

  openAddForm(){
    this.isShowModal = true;
    this.isAdd = true;
  }

  closeModal(){
    this.isShowModal = false;
    this.isAdd = false;
  }
}
