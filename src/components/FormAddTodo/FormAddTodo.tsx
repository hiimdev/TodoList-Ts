import React, { useState } from 'react';
import styles from './FormAddTodo.module.css';
import { addTodo, getAllTodo } from '../../utils/apiRequest';
import { GlobalContext, TodoContext } from '../../context/TodoContext';

const FormAddTodo: React.FC = () => {
  const { dispatch } = React.useContext(TodoContext) as GlobalContext;
  const [isPending, setIsPending] = useState<Boolean>(false);

  const [value, setValue] = useState<string>('');

  const [todo, setTodo] = useState({ title: '', status: 'Active' });

  const hanldeSubmit = async (event: { keyCode: number }): Promise<any> => {
    setTodo({ title: value, status: 'Active' });

    if (event.keyCode === 13) {
      setIsPending(true);
      if (todo.title.trim() === '') {
        setIsPending(false);
        return false;
      }
      await addTodo(todo);
      await getAllTodo().then(data => {
        if (data != null) {
          dispatch({ type: 'GET_TODO', payload: data.reverse() });
          dispatch({ type: 'GET_ACTIVE_TODO', payload: data.reverse() });
          dispatch({ type: 'GET_COMPLETED_TODO', payload: data.reverse() });
        }
      }).catch(err => console.log(err));
      setValue('');
      setIsPending(false);
    }
  };

  return (
    <>
      {
        isPending === true &&
        <input type='text'
          disabled className={`${styles.formAddTodo} ${styles.input} ${styles.disabled}`}
          placeholder='What needs to be done?'
        >
        </input>
      }
      {
        isPending === false &&
        <input type='text'
          className={`${styles.formAddTodo} ${styles.input}`}
          placeholder='What needs to be done?'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => {
            void hanldeSubmit(e);
          }}
        >
        </input>
      }
    </>
  );
};

export default FormAddTodo;
