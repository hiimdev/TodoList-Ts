export interface TodoAction {
  type: string
  payload: TodoItemType[] | TodoItemType | {} | string
}

export interface TodoState {
  todoList: TodoItemType[]
  activeTodoList: TodoItemType[]
  completedTodoList: TodoItemType[]
  todoStateType: string
}

export interface TodoItemType {
  _id: string
  title: string
  status: string
}

export enum TODO_LIST_TYPE {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed'
}

export enum TODO_TYPE {
  ACTIVE = 'Active',
  COMPLETED = 'Completed'
}
