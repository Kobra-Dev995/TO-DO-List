const CardTeste = ({ Id, Description, DeleteTodo }) => {
  return (
    <div id={Id} className='card bg-base-100 w-60 shadow-xl'>
      <figure>
        <img
          src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
          alt='Shoes'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>To Do {Id}</h2>
        <p>{Description}</p>

        <div className='card-actions justify-center'>
          <button className='btn btn-error' onClick={DeleteTodo}>deletar</button>
        </div>
      </div>
    </div>
  );
};

export default CardTeste;
