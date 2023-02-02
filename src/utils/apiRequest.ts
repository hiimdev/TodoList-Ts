import axios from 'axios';
import { TodoItemType } from '../interfaces/interface';

export const getAllTodo = async (): Promise<TodoItemType[] | undefined> => {
  try {
    const res = await axios.get('https://635668aa9243cf412f83e61b.mockapi.io/api/todos');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addTodo = async (todo: any): Promise<any> => {
  try {
    await axios.post('https://635668aa9243cf412f83e61b.mockapi.io/api/todos', todo);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id: string): Promise<any> => {
  try {
    await axios.delete(`https://635668aa9243cf412f83e61b.mockapi.io/api/todos/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusTodo = async (id: string, newTodo: any): Promise<any> => {
  try {
    await axios.put(`https://635668aa9243cf412f83e61b.mockapi.io/api/todos/${id}`, newTodo);
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (id: string, newTodo: any): Promise<any> => {
  try {
    await axios.put(`https://635668aa9243cf412f83e61b.mockapi.io/api/todos/${id}`, newTodo);
  } catch (error) {
    console.log(error);
  }
};
