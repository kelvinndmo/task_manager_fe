import { Component, OnInit } from "@angular/core";
import { Task } from "src/app/models/Task";
import { FormGroup, Validator, FormBuilder, Validators } from "@angular/forms";
import { TaskService } from "src/app/services/tasks/task.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit {
  taskForm: FormGroup;
  task = new Task();
  tasks = [];

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ["", [Validators.minLength(2), Validators.required]],
      description: ["", [Validators.minLength(2)]],
      completed: [false]
    });

    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task._id !== taskId);

    this.taskService.deleteTask(taskId);
  }

  completeTask(taskID) {
    // const task = (this.tasks = this.tasks.filter(taskk => task._id === taskID));
    this.tasks.forEach(task => {
      if (task._id === taskID) {
        task.completed = !task.completed;
        this.taskService.updateTask(task);
      }
    });
  }

  save() {
    const task = this.taskForm.value;
    this.taskService.postTask(task).subscribe(task => {
      this.tasks.push(task);
    });
  }
}
