const Card = ({ Title, Description, Image, DeleteTodo }) => {
  return (
    <>
      <div className='card bg-base-100 w-96 shadow-xl'>
        <figure className='w-full p-4 px-8'>
          <img src={Image} alt='TO DO Image' id="Image" className='w-full' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{Title}</h2>
          <p>{Description}</p>
          <div className='card-actions justify-end'>
            <button className='btn btn-success'>Editar</button>
            <button className='btn btn-error' onClick={DeleteTodo}>Deletar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
