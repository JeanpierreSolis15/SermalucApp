import { Task } from 'src/app/interfaces/task.interface';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Database,
  ref,
  push,
  set,
  onValue,
  query,
  remove,
  update,
} from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([]);
  constructor(private db: Database, private http: HttpClient,  private toastController: ToastController) {}

  addTask(task: any) {
    const taskRef = ref(this.db, 'tasks');
    const newTaskRef = push(taskRef);
    return set(newTaskRef, task);
  }

  addTaskService(task: Task): Promise<any> {
    return this.http.post(environment.URL_BASE_API + '/notifications/scheduleCreate', task).toPromise();
  }
  
  getTasks(): Observable<Task[]> {
    const tasksRef = ref(this.db, 'tasks');
    onValue(query(tasksRef), (snapshot) => {
      const tasks: Task[] = [];
      snapshot.forEach((childSnapshot) => {
        const task = {
          key: childSnapshot.key,
          ...(childSnapshot.val() as Task),
        };
        tasks.push(task);
      });
      this.tasks$.next(tasks);
    });
    return this.tasks$.asObservable();
  }

  deleteTask(taskKey: string) {
    const taskRef = ref(this.db, `tasks/${taskKey}`);
    return remove(taskRef);
  }

  getTask(taskId: string): Observable<Task> {
    const taskRef = ref(this.db, `tasks/${taskId}`);
    return new Observable((observer) => {
      onValue(
        taskRef,
        (snapshot) => {
          const data = snapshot.val();
          observer.next({ key: taskId, ...data });
        },
        {
          onlyOnce: true,
        }
      );
    });
  }

  updateTask(taskId: string, task: Task) {
    const taskRef = ref(this.db, `tasks/${taskId}`);
    return update(taskRef, { ...task });
  }

  async fireAlert(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }
}
