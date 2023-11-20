// Modules
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskRoutingModule } from './task.routing.module';

import { TaskAddPage } from './task-add/task-add.page';
import { TaskEditPage } from './task-edit/task-edit.page';
import { TaskListPage } from './task-list/task-list.page';
@NgModule({
  declarations: [
    TaskAddPage, TaskEditPage, TaskListPage,
  ],
  providers: [],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TaskRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskModule {}
