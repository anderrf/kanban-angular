import { KanbanTask } from './kanbanTask';
export interface TaskList {
  listName: string;
  tasks: KanbanTask[];
}
