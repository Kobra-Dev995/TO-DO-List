'use client';

import { Suspense, useState } from 'react';
import Card from './components/Card';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { refresh } = useRouter();
  const arryLocalStorage = [];

  for (let i = 0; i < localStorage.length; i++) {
    arryLocalStorage.push(JSON.parse(localStorage.getItem(`todo${i+1}`)));
    console.log(arryLocalStorage);
  }

  var filtro = arryLocalStorage.filter((todo) => todo);	

  const [titleTodo, setTitleTodo] = useState();
  const [imageTodo, setImageTodo] = useState();
  const [nameImagemUpload, setNameImagemUpload] = useState('Name');

  const [textTodo, setTextTodo] = useState('');
  const [urlBase64, setUrlBase64] = useState('');

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

  function handleCreateTodo(event) {
    const idTodo = localStorage.length;

    document.querySelector('#file').value = '';
    document.querySelector('#textTodo').value = '';

    console.log(idTodo);

    localStorage.setItem(
      `todo${idTodo + 1}`,
      JSON.stringify({
        id: idTodo + 1,
        title: textTodo,
        image: urlBase64 || '',
      })
    );

    refresh();
  }

  function handleDeleteTodo(id) {
    const idTodo =
      id.target.parentNode.parentNode.childNodes[0].innerHTML.split(' ');
    console.log(idTodo[idTodo.length - 1]);
    localStorage.removeItem(`todo${idTodo[idTodo.length - 1]}`);
    refresh();
  }

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
          <Suspense fallback={<p>Carregando...</p>}>
            {filtro.reverse().map((todo) => {
              return (
                <Card
                  key={todo?.id}
                  Title={`TO DO ${todo?.id}`}
                  Description={todo?.title}
                  Image={todo?.image}
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