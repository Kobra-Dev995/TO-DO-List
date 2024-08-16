'use client';

import { Suspense, useEffect, useState } from 'react';
import Card from './components/Card';
import { useRouter } from 'next/navigation';

function setLocalStorage(key, value) {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value);
  }
}

function getLocalStorage(key) {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
}

function removeLocalStorage(key) {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(key);
  }
}

// function lengthLocalStorage() {
//   return window.localStorage.length;
// }

export default function Home() {
  const [nameImagemUpload, setNameImagemUpload] = useState('Name');
  const [textTodo, setTextTodo] = useState('');
  const [urlBase64, setUrlBase64] = useState('');
  const [array, setArray] = useState([]);

  const filtro = array.filter((todo) => {
    return todo;
  });

  function handleFileUpload(event) {
    const reader = new FileReader();
    reader.onload = () => {
      setNameImagemUpload(event.target.files[0].name);
      setUrlBase64((prevState) => (prevState = reader.result));
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function handleTextTodo(event) {
    setTextTodo((prevState) => (prevState = event.target.value));
  }

  function handleCreateTodo() {
    if (!textTodo && !urlBase64) {
      return;
    }

    setArray((prevState) => [
      ...prevState,
      {
        id: array.length + 1,
        Title: textTodo,
        Image: urlBase64,
      },
    ]);

    setLocalStorage(
      `todo${array.length + 1}`,
      JSON.stringify({
        id: array.length + 1,
        Title: textTodo,
        Image: urlBase64,
      })
    );

    document.querySelector('#textTodo').value = '';
    document.querySelector('#file').value = '';
    setNameImagemUpload('Name');
    setUrlBase64('');
    setTextTodo('');
  }

  function handleDeleteTodo(event) {
    const todoDeleted = [];
    const idTodo =
      event.target.parentNode.parentNode.childNodes[0].innerHTML.split(' ');
    const idDelete = idTodo[idTodo.length - 1];

    for (const todo of filtro) {
      if (todo.id == idDelete) {
        todoDeleted.push(array.slice(idDelete - 1, idDelete));
      }
    }

    removeLocalStorage(`todo${todoDeleted[0].id}`);
  }

  useEffect(() => {
    const arrayLocalStorage = [];

    if (!window.localStorage) {
      for (let i = 0; i < window.localStorage.length; i++) {
        const data = getLocalStorage(`todo${i}`);
        if (!data) {
          break;
        }
        arrayLocalStorage.push(data);
      }
    }
    
    setArray(arrayLocalStorage);
  }, []);

  console.log(array);

  return (
    <>
      <header className='navbar bg-emerald-600'>
        <span className='btn btn-ghost text-xl text-white font-semibold'>
          TO DO List With Next.js
        </span>
      </header>

      <main className='w-full min-h-screen flex flex-col items-center justify-center p-4'>
        <section className='rounded-xl w-11/12 h-40 flex items-center justify-center gap-4 p-4'>
          <label
            htmlFor='file'
            className='btn btn-outline btn-info form-control'
          >
            <input
              id='file'
              type='file'
              accept='image/png, image/jpeg'
              className='file-input file-input-bordered file-input-success hidden'
              onChange={handleFileUpload}
            />

            <span>Upload</span>
            <span className='text-slate-400 '>{nameImagemUpload}</span>
          </label>

          <label className='form-control w-full max-w-xs'>
            <input
              id='textTodo'
              type='text'
              placeholder='Tarefa'
              className='input input-bordered w-full max-w-xs'
              onChange={handleTextTodo}
            />
          </label>

          <button
            className='btn btn-outline btn-success'
            onClick={handleCreateTodo}
          >
            Criar
          </button>
        </section>

        <section>
          <Suspense fallback={<p>Loading...</p>}>
            {new Promise((resolve) => setTimeout(resolve, 2000))}
            {filtro.map((todo) => {
              return (
                <Card
                  key={todo.id}
                  Title={`TO DO ${todo.id}`}
                  Description={todo.Title}
                  Image={todo.Image}
                  DeleteTodo={handleDeleteTodo}
                />
              );
            })}
          </Suspense>
        </section>
      </main>
    </>
  );
}
