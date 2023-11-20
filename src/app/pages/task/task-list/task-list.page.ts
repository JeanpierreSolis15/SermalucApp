import { Component, OnInit } from '@angular/core';
import { Task, TaskResponse } from '../../../interfaces/task.interface';
import { ActionSheetController } from '@ionic/angular';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tareas: Task[] = [];
  isLoading = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public actionSheetController: ActionSheetController,
    private taskService: TaskService,
    private router: Router,
    private LService: LoaderService
  ) {
    console.log(this.tareas);
  }

  ngOnInit() {
    this.LService.showLoader();
    this.taskService
      .getTasks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (tasks: Task[]) => {
          this.LService.dismissLoader();
          console.info(tasks);
          this.tareas = tasks;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener tareas', error);
          this.LService.dismissLoader();
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editarTarea(taskKey: string) {
    this.router.navigate(['/task-edit', taskKey]);
  }

  async eliminarTarea(taskKey: string) {
    await this.LService.showLoader();
    try {
      await this.taskService.deleteTask(taskKey);
      this.tareas = this.tareas.filter((task: any) => task.key !== taskKey);
    } catch (error) {
      console.error('Error al eliminar la tarea', error);
    } finally {
      await this.LService.dismissLoader();
      this.isLoading = false;
    }
  }

  getTaskStatus(task: any): string {
    const now = new Date();
    const taskTime = new Date(task.fechaHora);
    const oneHour = 1000 * 60 * 60;

    if (taskTime.getTime() < now.getTime()) {
      return 'Tarea Pasada';
    } else if (taskTime.getTime() - now.getTime() < oneHour) {
      return 'Tarea Cerca';
    } else {
      return 'Tarea Próxima';
    }
  }

  async presentActionSheet(task: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones para la tarea',
      mode: 'ios',
      buttons: [
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => {
            this.editarTarea(task.key);
          },
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.eliminarTarea(task.key);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }
}
