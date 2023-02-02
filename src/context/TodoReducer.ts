import { TodoAction, TodoItemType, TodoState } from '../interfaces/interface';

export const TodoReducer = (state: TodoState, action: TodoAction): TodoState => {
  let newState;

  switch (action.type) {
    case 'GET_TODO':
      newState = {
        todoList: [...action.payload as TodoItemType[]],
        activeTodoList: [...state.activeTodoList],
        completedTodoList: [...state.completedTodoList],
        todoStateType: state.todoStateType
      };
      break;
    case 'GET_ACTIVE_TODO': {
      const newActiveTodoList = state.todoList.filter(todo => todo.status === 'Active');

      newState = {
        todoList: [...state.todoList],
        activeTodoList: newActiveTodoList,
        completedTodoList: [...state.completedTodoList],
        todoStateType: state.todoStateType
      };
      break;
    }
    case 'GET_COMPLETED_TODO': {
      const newCompletedTodoList = state.todoList.filter(todo => todo.status === 'Completed');

      newState = {
        todoList: [...state.todoList],
        activeTodoList: [...state.activeTodoList],
        completedTodoList: newCompletedTodoList,
        todoStateType: state.todoStateType
      };
      break;
    }
    case 'SET_ALL_TODO_STATE': {
      newState = {
        todoList: [...state.todoList],
        activeTodoList: [...state.activeTodoList],
        completedTodoList: [...state.completedTodoList],
        todoStateType: action.payload as string
      };
      break;
    }
    case 'SET_ACTIVE_TODO_STATE': {
      newState = {
        todoList: [...state.todoList],
        activeTodoList: [...state.activeTodoList],
        completedTodoList: [...state.completedTodoList],
        todoStateType: action.payload as string
      };
      break;
    }
    case 'SET_COMPLETED_TODO_STATE': {
      newState = {
        todoList: [...state.todoList],
        activeTodoList: [...state.activeTodoList],
        completedTodoList: [...state.completedTodoList],
        todoStateType: action.payload as string
      };
      break;
    }
    case 'ADD_TODO': {
      let newActiveTodoList = [...state.activeTodoList];
      newActiveTodoList = [(action.payload as TodoItemType), ...state.activeTodoList];
      let newTodolist = [...state.activeTodoList];
      newTodolist = [(action.payload as TodoItemType), ...state.activeTodoList];

      newState = {
        todoList: newTodolist,
        activeTodoList: newActiveTodoList,
        completedTodoList: [...state.completedTodoList],
        todoStateType: state.todoStateType
      };
      break;
    }
    case 'DELETE_TODO': {
      const newTodoList = state.todoList.filter((todo) => todo._id !== (action.payload as TodoItemType)._id);

      let newActiveTodoList = [...state.activeTodoList];
      let newCompletedTodoList = [...state.completedTodoList];

      if ((action.payload as TodoItemType).status === 'Active') {
        newActiveTodoList = state.activeTodoList.filter((todo) => todo._id !== (action.payload as TodoItemType)._id);
      } else {
        newCompletedTodoList = state.completedTodoList.filter((todo) => todo._id !== (action.payload as TodoItemType)._id);
      }

      newState = {
        todoList: newTodoList,
        activeTodoList: newActiveTodoList,
        completedTodoList: newCompletedTodoList,
        todoStateType: state.todoStateType
      };
      break;
    }
    default:
      return state;
  }
  return newState;
};
