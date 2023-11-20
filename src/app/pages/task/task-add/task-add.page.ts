import { LoaderService } from './../service/loader.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from './../service/task.service';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.page.html',
  styleUrls: ['./task-add.page.scss'],
})
export class TaskAddPage implements OnInit {
  task: Task = {
    nombre: '',
    descripcion: '',
    reminder: false,
    fechaHora: new Date(),
  };
  tokenFcm: any;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private LService: LoaderService
  ) {
    console.log(new Date());
  }

  createTask() {
    this.LService.showLoader();
    this.taskService.addTask(this.task).then(() => {
      console.log('Tarea guardada en Firebase');
      this.taskService.fireAlert('Tarea guardada con éxito');

      if (this.task.reminder) {
        this.sendNotificationRequest();
      } else {
        this.LService.dismissLoader();
        this.router.navigate(['/task-list']);
      }
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

  ngOnInit(): void {}
}
