'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from './components/Card';

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [count, setCount] = useState(0);
  const [task, setTask] = useState('');
  const [urlBase64, setUrlBase64] = useState('');
  const [urlBase64Temp, setUrlBase64Temp] = useState('');
  const { refresh } = useRouter();

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
  const handleFileUploadTemp = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUrlBase64Temp(reader.result);
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
        image: urlBase64,
      },
    ]);

    setLocalStorage(
      `todo${lastTodo + 1}`,

      JSON.stringify({
        id: lastTodo + 1,
        text: task,
        image: urlBase64,
      })
    );

    setTask('');
    setUrlBase64('');

    alert('Tarefa criada com sucesso!');
  };

  const handleDeleteTodo = (id) => {
    const idNumber =
      id.target.parentElement.parentElement.childNodes[0].innerHTML.split(' ');

    deleteLocalStorage(`todo${idNumber[idNumber.length - 1]}`);

    setTodo((prevState) =>
      prevState.filter((todo) => todo.id != idNumber[idNumber.length - 1])
    );

    alert('Tarefa deletada com sucesso!');
  };

  const handleEditTodo = (id) => {
    const button = id;

    const idNumber =
      id.target.parentElement.parentElement.childNodes[0].innerHTML.split(' ');
    const editTodo = document.getElementById(
      `${idNumber[idNumber.length - 1]}`
    );
    const textTask = editTodo.childNodes[1].childNodes[1];
    const imageTask = editTodo.childNodes[0].childNodes[0];

    // button.target.innerHTML == 'Editar'
    // textTask.setAttribute('contenteditable', 'false');

    if (button.target.innerHTML == 'Editar') {
      button.target.innerHTML = 'Salvar';
      textTask.setAttribute('contenteditable', 'true');
      const teste = document.getElementById(`fileTemp`).click(); //editTodo.childNodes[0].childNodes[0] handleFileUpload(imageTask)
      textTask.focus();
    } else {
      alert('Tarefa editada com sucesso! Por favor, atualize a página para ver as alterações');
      button.target.innerHTML = 'Editar';
      textTask.setAttribute('contenteditable', 'false');
      setUrlBase64Temp('');
    }

    //button.target.innerHTML = 'Editar';

    setLocalStorage(
      `todo${idNumber[idNumber.length - 1]}`,

      JSON.stringify({
        id: idNumber[idNumber.length - 1],
        text: textTask.textContent,
        image: urlBase64Temp || imageTask.src,
      })
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

    // if (temp == undefined) {
    // localStorage de bug ally-supports-cache
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
      <header className='navbar bg-base-300 flex justify-center'>
        <div className='navbar-center'>
          <a className='btn btn-ghost text-xl'>To Do List - LocalStorage</a>
        </div>
      </header>

      <main className='w-full min-h-screen flex flex-col items-center justify-start gap-4 p-4'>
        <section className='flex flex-col gap-4 mb-8'>
          <input
            type='file'
            name='file'
            id='fileTemp'
            accept='image/png, image/jpeg'
            className='file-input file-input-bordered w-full max-w-xs hidden'
            onChange={handleFileUploadTemp}
          />
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
        </section>

        <section className='bg-base-200 flex flex-wrap justify-center gap-4'>
          {todo.map((todo) => {
            return (
              <Card
                key={todo.id}
                Id={todo.id}
                Image={todo.image}
                Title={`Tarefa ${todo.id}`}
                Description={todo.text}
                DeleteTodo={handleDeleteTodo}
                EditTodo={handleEditTodo}
              />
            );
          })}
        </section>

        {/* <p>{JSON.stringify(todo)}</p> */}
      </main>

      <footer className='footer footer-center bg-base-300 text-base-content p-4'>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Kobra-Dev995
          </p>
        </aside>
      </footer>
    </>
  );
}
