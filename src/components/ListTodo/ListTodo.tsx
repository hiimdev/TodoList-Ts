import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './ListTodo.module.css';
import { GlobalContext, TodoContext } from '../../context/TodoContext';
import { TodoItemType, TODO_LIST_TYPE, TODO_TYPE } from '../../interfaces/interface';
import { deleteTodo, updateStatusTodo, updateTodo, getAllTodo } from '../../utils/apiRequest';

const ListTodo: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext) as GlobalContext;
  const [isPending, setIsPending] = useState<boolean>(false);

  const [isToast, setIsModalOpen] = useState<boolean>(false);
  const [Del, setDel] = useState<TodoItemType>({ _id: '', title: '', status: 'Active' });

  const [list, setList] = useState<TodoItemType[]>([]);

  const [isEdit, setIsEdit] = useState(false);

  const [editTodo, setEditTodo] = useState<TodoItemType>({ _id: '', title: '', status: 'Active' });

  const sortArr = (todos: TodoItemType[]): TodoItemType[] => {
    const newList = [...todos.filter(i => i.status === 'Active'), ...todos.filter(i => i.status === 'Completed')];
    return newList;
  };

  const updateData = useCallback(async () => {
    await getAllTodo().then(data => {
      if (data != null) {
        dispatch({ type: 'GET_TODO', payload: data.reverse() });
        dispatch({ type: 'GET_ACTIVE_TODO', payload: data.reverse() });
        dispatch({ type: 'GET_COMPLETED_TODO', payload: data.reverse() });
      }
    }).catch(err => console.log(err));
  }, [list]);

  useEffect(() => {
    switch (state.todoStateType) {
      case TODO_LIST_TYPE.ACTIVE:
        setList(state.activeTodoList);
        break;
      case TODO_LIST_TYPE.COMPLETED:
        setList(state.completedTodoList);
        break;
      default:
        setList(sortArr(state.todoList));
        break;
    }
  }, [state.completedTodoList, state.todoList, state.activeTodoList, state.todoStateType]);

  const onModalDel = (todo: any): void => {
    setIsModalOpen(true);
    setDel({ _id: todo._id, title: todo.title, status: todo.status });
  };

  const handleDeleteTodo = async (todo: any): Promise<any> => {
    setIsModalOpen(false);
    setIsPending(true);
    await deleteTodo(todo._id);
    dispatch({ type: 'DELETE_TODO', payload: todo });
    setIsPending(false);
  };

  const handleAddCompletedTodo = async (todo: TodoItemType): Promise<any> => {
    if (todo.status === 'Completed') {
      return false;
    } else {
      setIsPending(true);
      await updateStatusTodo(todo._id, { status: TODO_TYPE.COMPLETED });
    }

    void updateData();
    setIsPending(false);
  };

  const handleUpdateTodo = async (event: { keyCode: number }, todo: any): Promise<any> => {
    if (event.keyCode === 13) {
      setIsPending(true);
      if (editTodo.title.trim() !== '') {
        await updateTodo(todo._id, editTodo);
      } else {
        setIsPending(false);
        return false;
      }
      setEditTodo({ _id: '', title: '', status: '' });
      setIsEdit(false);
    }
    void updateData();
    setIsPending(false);
  };

  return (
    <ul className={styles.container}>
      {
        isPending && <div className={styles.loader}></div>
      }
      { !isPending &&
        list.map((todo: TodoItemType) =>
          <li className={styles.item} key={todo._id}
            style={{ textDecoration: todo.status === 'Completed' ? 'line-through' : '' }}
          >
            {editTodo._id === todo._id && isEdit
              ? (<input
                className={styles.inputEdit}
                type='text'
                onChange={(e) => setEditTodo({ _id: todo._id, title: e.target.value, status: 'Active' })}
                onKeyDown={ (e) => { void handleUpdateTodo(e, todo); }}
                value={editTodo.title}
              />)
              : (<p>{todo.title}</p>)
            }
            {
              todo.status === 'Completed' &&
              <div className={styles.btnWrapper}>
                <button disabled className={`${styles.actionBtn} ${styles.disabled}`}>
                  <span>Complete</span>
                </button>
                <button className={styles.actionBtn} onClick={() => onModalDel(todo)}>
                  <span>Delete</span>
                </button>
                <button disabled className={`${styles.actionBtn} ${styles.disabled}`}>
                  <span>Update</span>
                </button>
              </div>
            }
            {
              todo.status !== 'Completed' &&
              <div className={styles.btnWrapper}>
                {editTodo._id === todo._id && isEdit
                  ? (<>
                    <button className={`${styles.actionBtn} ${styles.disabled}`}>
                      <span>Complete</span>
                    </button><button className={`${styles.actionBtn} ${styles.disabled}`}>
                      <span>Delete</span>
                    </button>
                  </>)
                  : (<>
                    <button className={styles.actionBtn} onClick={() => {
                      void handleAddCompletedTodo(todo);
                    } }>
                      <span>Complete</span>
                    </button><button className={styles.actionBtn} onClick={() => onModalDel(todo)}>
                      <span>Delete</span>
                    </button>
                  </>)
                }
                <button className={styles.actionBtn} onClick={() => {
                  setEditTodo(todo);
                }}>
                  {editTodo._id === todo._id && isEdit
                    ? (<p className={styles.btnEdit} onClick={() => setIsEdit(false)}>Exit</p>)
                    : (<p className={styles.btnEdit} onClick={() => setIsEdit(true)}>Update</p>)
                  }
                </button>
              </div>
            }
            {
              // Modal delete
              isToast && Del._id === todo._id &&
              <div id="myModal" className={styles.modal}>
                <div className={styles.modalContent}>
                  <span className={styles.close} onClick={() => setIsModalOpen(false)}>×</span>
                  <p>Are you sure ?</p>
                  <button className={`${styles.actionBtn} ${styles.floatRight}`} onClick={() => setIsModalOpen(false)}>No</button>
                  <button className={`${styles.actionBtn} ${styles.floatRight}`} onClick={() => {
                    void handleDeleteTodo(Del);
                  }}>Yes</button>
                </div>
              </div>
            }
          </li>
        )
      }
      {
        list?.length === 0 && (<p className={styles.textNothing}>Nothing Here!!!</p>)
      }
    </ul>
  );
};

export default ListTodo;
