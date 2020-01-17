import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from "src/app/models/Task";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class TaskService {
  baseURL = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/tasks`);
  }

  postTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseURL}/tasks`, task, httpOptions);
  }

  deleteTask(postId): Observable<any> {
    const url = `${this.baseURL}/tasks/${postId}`;
    return this.http.delete(url, httpOptions);
  }

  updateTask(task): Observable<any> {
    console.log(task);

    const updates = {
      completed: task.completed,
      description: task.description
    };

    const url = `${this.baseURL}/tasks/${task._id}`;
    return this.http.put(url, updates, httpOptions);
  }
}
