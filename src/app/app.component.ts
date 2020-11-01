import { toDo, toDoModel, dataList } from './model/todo';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HelperService } from './services/helper.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  listTodo: Array<toDo> = [];
  isShowModal: boolean = false;
  isAdd: boolean = false;
  todoForm: FormGroup;
  today: Date = new Date();
  taskInfo: toDo = new toDoModel();
  currentId: number;
  filterValue: string;
  cloneData: Array<toDo> = [];
  constructor(
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private helper: HelperService
  ) {
    this.listTodo = JSON.parse(JSON.stringify(dataList));
    this.cloneData = JSON.parse(JSON.stringify(dataList));
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, []),
      dueDate: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, []),
    });
    this.sortData();
    console.log(this.listTodo);
  }

  sortData() {
    return this.listTodo.sort((a, b) => {
      return <any>new Date(b.dueDate) - <any>new Date(a.dueDate);
    });
  }

  submitForm(e) {
    for (const i in this.todoForm.controls) {
      this.todoForm.controls[i].markAsDirty();
      this.todoForm.controls[i].updateValueAndValidity();
    }
    if (this.isAdd) {
      if (this.todoForm.value.dueDate < this.today) {
        this.message.error('Invalid due date!');
        return;
      }
    }
    if (this.todoForm.valid) {
      if (this.isAdd) {
        let obj = {
          id: this.listTodo.length + 1,
          title: this.todoForm.value.title,
          description: this.todoForm.value.description,
          dueDate: this.todoForm.value.dueDate,
          priority: this.todoForm.value.priority,
          showDone: 0
        };
        this.listTodo.push(obj);
      } else {
        for (let i = 0; i < this.listTodo.length; i++) {
          if (this.listTodo[i].id == this.currentId) {
            this.listTodo[i].title = this.todoForm.value.title;
            this.listTodo[i].description = this.todoForm.value.description;
            this.listTodo[i].dueDate = this.todoForm.value.dueDate;
            this.listTodo[i].priority = this.todoForm.value.priority;
          }
        }
      }
      this.closeModal();
      this.sortData();
      this.updateData();
    }
  }

  closeModal() {
    this.isShowModal = false;
    this.isAdd = false;
  }

  openAddForm() {
    this.isShowModal = true;
    this.isAdd = true;
    this.refreshForm();
    this.today = new Date();
    this.taskInfo.dueDate = new Date();
    this.taskInfo.priority = 'nomal';
  }

  openUpdateForm(item) {
    this.isShowModal = true;
    this.isAdd = false;
    this.currentId = item.id;
    this.taskInfo.title = item.title;
    this.taskInfo.description = item.description;
    this.taskInfo.dueDate = new Date(item.dueDate);
    this.taskInfo.priority = item.priority;
  }

  refreshForm() {
    this.taskInfo = new toDoModel();
  }

  updateChecked(e, data) {
    if (e.target.checked) {
      for (let i = 0; i < this.listTodo.length; i++) {
        if (this.listTodo[i].id == data.id) {
          this.listTodo[i].showDone = 1;
        }
      }
      this.updateData();
      return;
    }
    for (let i = 0; i < this.listTodo.length; i++) {
      if (this.listTodo[i].id == data.id) {
        this.listTodo[i].showDone = 0;
      }
    }
    this.updateData();
    return;
  }

  changeToDone(){
    alert('Done!');
  }

  removeItem(index) {
    if (confirm('Are you sure you want to delete?')) {
      this.listTodo.splice(index, 1);
      this.updateData();
      return;
    }
    return;
  }

  updateData() {
    this.cloneData = this.listTodo;
  }

  doSearch(e) {
    if (e.keyCode == 13) {
      return (this.listTodo = this.cloneData.filter((x) =>
        x.title.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase().trim())
      ));
    }
  }
}
