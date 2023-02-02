import React from 'react';
import styles from './FilterTodo.module.css';
import FormAddTodo from '../FormAddTodo/FormAddTodo';
import { GlobalContext, TodoContext } from '../../context/TodoContext';
import { TODO_LIST_TYPE } from '../../interfaces/interface';

const FilterTodo: React.FC = () => {
  const { state, dispatch } = React.useContext(TodoContext) as GlobalContext;

  const [all, setAll] = React.useState({
    background: 'rgb(9, 160, 9)',
    color: 'white'
  });
  const [active, setActive] = React.useState({});
  const [complete, setComplete] = React.useState({});

  const handleSetActiveTodo: () => void = () => {
    setActive({
      background: 'rgb(9, 160, 9)',
      color: 'white'
    });
    setComplete({});
    setAll({
      background: '',
      color: ''
    });

    dispatch({ type: 'SET_ACTIVE_TODO_STATE', payload: TODO_LIST_TYPE.ACTIVE });
  };

  const handleSetCompletedTodo: () => void = () => {
    setComplete({
      background: 'rgb(9, 160, 9)',
      color: 'white'
    });
    setAll({
      background: '',
      color: ''
    });
    setActive({});
    dispatch({ type: 'SET_COMPLETED_TODO_STATE', payload: TODO_LIST_TYPE.COMPLETED });
  };
  const handleSetAllTodo: () => void = () => {
    setAll({
      background: 'rgb(9, 160, 9)',
      color: 'white'
    });
    setComplete({});
    setActive({});

    dispatch({ type: 'SET_ALL_TODO_STATE', payload: TODO_LIST_TYPE.ALL });
  };

  return (
    <div className={styles.container}>
      <FormAddTodo />

      <div className={styles.filterWrapper}>
        <button className={`${styles.filterItem} ${styles.filterAll}`}
          onClick={handleSetAllTodo}
          style={all}
        >
          All: {state.todoList.length}
        </button>
        <button className={`${styles.filterItem} ${styles.filterActive}`}
          onClick={handleSetActiveTodo}
          style={active}
        >
          Active: {state.activeTodoList.length}
        </button>
        <button className={`${styles.filterItem} ${styles.filterCompleted}`}
          onClick={handleSetCompletedTodo}
          style={complete}
        >
          Completed: {state.completedTodoList.length}
        </button>
      </div>
    </div>
  );
};

export default FilterTodo;
