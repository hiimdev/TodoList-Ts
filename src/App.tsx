import React, { useEffect, useContext } from 'react';
import ListTodo from './components/ListTodo/ListTodo';
import { GlobalContext, TodoContext } from './context/TodoContext';
import { getAllTodo } from './utils/apiRequest';
import FilterTodo from './components/FilterTodo/FilterTodo';
import './App.css';

const App: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext) as GlobalContext;

  useEffect(() => {
    getAllTodo().then(data => {
      if (data != null) {
        dispatch({ type: 'GET_TODO', payload: data.reverse() });
        dispatch({ type: 'GET_ACTIVE_TODO', payload: data.reverse() });
        dispatch({ type: 'GET_COMPLETED_TODO', payload: data.reverse() });
      }
    }).catch(err => console.log(err));
  }, [state.todoStateType]);

  return (
    <div className='container'>
      <p className='title'>Todo list</p>
      <FilterTodo />
      <ListTodo />
    </div>
  );
};

export default App;
