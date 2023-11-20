import { TaskRoutes } from './task.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [RouterModule.forChild(TaskRoutes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}