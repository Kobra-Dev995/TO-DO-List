'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from './components/Card';

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [count, setCount] = useState(0);
  const [task, setTask] = useState('');
  const [urlBase64, setUrlBase64] = useState('');


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



  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUrlBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleCreateTodo = () => {

    if (urlBase64 == '' && task == '') {
      alert('Preencha todos os campos');
      return;
    }

    const temp = [];
    for (const task of todo) {
      temp.push(task.id);
    }

    const ordemCresc = temp.sort();
    let lastTodo = ordemCresc[temp.length - 1];

    if (lastTodo == undefined) {
      lastTodo = 0;
    }
    

    setTodo((prevState) => [
      ...prevState,
      {
        id: lastTodo + 1,
        text: task,
        image: urlBase64
      },
    ]);

    setLocalStorage(
      `todo${lastTodo + 1}`,

      JSON.stringify({
        id: lastTodo + 1,
        text: task,
        image: urlBase64
      })
    );

    setTask('');
    setUrlBase64('');
  };

  const handleDeleteTodo = (id) => {
    const idNumber =
      id.target.parentElement.parentElement.childNodes[0].innerHTML.split(' ');

    deleteLocalStorage(`todo${idNumber[idNumber.length - 1]}`);

    setTodo((prevState) =>
      prevState.filter((todo) => todo.id != idNumber[idNumber.length - 1])
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

    // essa merda vai quebrar o projeto se eu tiver um localStorage diferente de todo${number}

    // if (temp) {
    //   return;  
    // }

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
        <h1 className='text-3xl font-bold'>To Do List - LocalStorage</h1>

        <div className='flex flex-col gap-4 mb-8'>
          <input
            type='file'
            name='file'
            id='file'
            accept='image/png, image/jpeg'
            className='file-input file-input-bordered w-full max-w-xs'
            onChange={handleFileUpload}
          />
          <input
            type='text'
            name='text'
            id='text'
            className='input input-bordered w-full max-w-xs'
            placeholder='digite uma tarefa'
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />

          <button className='btn btn-primary' onClick={handleCreateTodo}>
            criar todo
          </button>
        </div>

        <div>
          {todo.map((todo) => {
            return (
              <Card
                key={todo.id}
                Id={todo.id}
                Image={todo.image}
                Title={`Tarefa ${todo.id}`}
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
