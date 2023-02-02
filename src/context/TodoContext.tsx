import React from 'react';
import { TodoAction, TodoState, TODO_LIST_TYPE } from '../interfaces/interface';
import { TodoReducer } from './TodoReducer';

interface Props {
  children: React.ReactNode
}

export interface GlobalContext {
  state: TodoState
  dispatch: React.Dispatch<TodoAction>
}

const initialState: TodoState = {
  todoList: [],
  activeTodoList: [],
  completedTodoList: [],
  todoStateType: TODO_LIST_TYPE.ALL
};

export const TodoContext = React.createContext<GlobalContext | null>(null);

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(TodoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      { children }
    </TodoContext.Provider>
  );
};
