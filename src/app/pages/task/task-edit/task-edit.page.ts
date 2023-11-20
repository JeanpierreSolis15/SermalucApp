import { Task } from 'src/app/interfaces/task.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../service/task.service';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.page.html',
  styleUrls: ['./task-edit.page.scss'],
})
export class TaskEditPage implements OnInit {
  task: Task = {
    nombre: '',
    descripcion: '',
    reminder: false,
    fechaHora: new Date(),
  };
  taskId!: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private LService: LoaderService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.taskId = this.route.snapshot.params['taskId'];
    this.taskService.getTask(this.taskId).subscribe((taskData) => {
      this.task = taskData;
    }),
      (error: any) => {
        this.taskService.fireAlert('Error al obtener la tarea', 'danger');
        console.error('Error al obtener la tarea', error);
      };
  }

  updateTask() {
    this.LService.showLoader();
    this.taskService
      .updateTask(this.taskId, this.task)
      .then(() => {
        if (this.task.reminder) {
          this.sendNotificationRequest();
        }
        this.LService.dismissLoader();
        this.taskService.fireAlert('Tarea actualizada con éxito');
        console.log('Tarea actualizada con éxito');
        this.router.navigate(['/task-list']);
      })
      .catch((error) => {
        this.LService.dismissLoader();
        console.error('Error al actualizar la tarea', error);
      });
  }

  sendNotificationRequest() {
    const token = localStorage.getItem('tokenFcm');
    // const token =
    // 'fY5AZsA0TwGD9IHPKT5tIG:APA91bFD87Ge4BI5ICqEalG7uMrrG9qi0lihV5ffVp8IvkPo779hbB4xRoCMuTBUBCR8LE-uoDOBpp1clCFARz6MH7XGLFQ9vKuNMxK4W9EUsJABzZB1L1AEStH-cmtq6qS7OiG-nq2M';
    let fechaHoraDate;
    if (this.task.fechaHora) {
      fechaHoraDate = new Date(this.task.fechaHora);
    }

    const data: Task = {
      nombre: this.task.nombre,
      descripcion: this.task.descripcion,
      fechaHora: fechaHoraDate,
      token: token,
    };

    this.taskService.addTaskService(data).then(
      (response) => {
        this.LService.dismissLoader();
        console.log('Notificación programada', response);
        this.taskService.fireAlert('Notificación programada con éxito');
        this.router.navigate(['/task-list']);
      },
      (error) => {
        this.LService.dismissLoader();
        console.error('Error al enviar notificación', error);
        this.router.navigate(['/task-list']);
        this.taskService.fireAlert('Error al enviar notificación', 'danger');
      }
    );
  }
}
