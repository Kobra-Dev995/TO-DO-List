'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CardTeste from './components/cardTeste';

export default function Teste() {
  const [todo, setTodo] = useState([]);
  const [count, setCount] = useState(0);

  const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
    }
  };

  const setLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.setItem(key, value);
    }
  };

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      return window.localStorage.clear();
    }
  };

  const deleteLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.removeItem(key);
    }
  };

  const keyLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.key(key);
    }
  };

  const handleCreateTodo = () => {
    setTodo((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        text: `Tarefa ${prevState.length + 1}`,
      },
    ]);

    setLocalStorage(
      `todo${todo.length + 1}`,
      JSON.stringify({
        id: todo.length + 1,
        text: `Tarefa ${todo.length + 1}`,
      })
    );
  };

  const handleDeleteTodo = (id) => {
    const idNumber =
      id.target.parentElement.parentElement.childNodes[0].innerHTML.split(' ');

    deleteLocalStorage(`todo${idNumber[2]}`);
    setTodo((prevState) =>
      prevState.filter(
        (
          todo //todo.id !== idNumber[2]
        ) => console.log(todo)
      )
    );
  };

  const handleClearLocalStorage = () => {
    clearLocalStorage();
  };

  const handleInitialFetch = () => {
    const temp = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      temp.push(keyLocalStorage(i));
    }

    for (const todo of temp) {
      setTodo((prevState) => [...prevState, JSON.parse(getLocalStorage(todo))]);
    }
  };

  useEffect(() => {
    handleInitialFetch();
  }, []);

  console.log(todo);

  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center gap-4 p-4'>
        <h1 className='text-3xl font-bold'>Teste</h1>

        <div className='flex gap-4 mb-8'>
          <button className='btn btn-primary' onClick={handleCreateTodo}>
            criar todo
          </button>
          <button className='btn btn-error' onClick={handleClearLocalStorage}>
            limpar localStorage
          </button>
        </div>

        <div>
          {todo.map((todo) => {
            return (
              <CardTeste
                key={todo.id}
                Id={todo.id}
                Description={todo.text}
                DeleteTodo={handleDeleteTodo}
              />
            );
          })}
        </div>

        {/* <p>{JSON.stringify(todo)}</p> */}
      </div>
    </>
  );
}
