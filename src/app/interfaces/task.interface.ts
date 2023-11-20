export interface Task {
  nombre: string;
  descripcion: string;
  reminder?: boolean;
  fechaHora: Date | any;
  token?: string | null;
}

export interface TaskResponse {
  key: string
  descripcion: string
  fechaHora: string
  nombre: string
  reminder?: boolean
}