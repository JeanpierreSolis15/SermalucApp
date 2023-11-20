import { Routes } from '@angular/router';
import { TaskAddPage } from './task-add/task-add.page';
import { TaskEditPage } from './task-edit/task-edit.page';
import { TaskListPage } from './task-list/task-list.page';

export const TaskRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'task-add', component: TaskAddPage },
      { path: 'task-list', component: TaskListPage },
      {
        path: 'task-edit/:taskId',
        component: TaskEditPage,
      },
    ],
  },
];
