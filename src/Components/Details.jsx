import React , {useContext, useEffect, useState,  } from 'react'
import { Link , useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading'
import { ProductContext } from '../Utils/Context'

const Details = () => {
 const navigate= useNavigate();
  const [products , setproducts] = useContext(ProductContext)
  const [product, setproduct] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    if(!product){
      setproduct(products.filter((p)=> p.id == id)[0])
    }
  
  }, [])

const productDeleteHandler = (id) => {
  const filteredProducts = products.filter((p) => p.id !== id);
  setproducts(filteredProducts);
  localStorage.setItem('products', JSON.stringify(filteredProducts));
  navigate('/');
} 

  return product ? (  
    <div className='w-[70%] h-full flex sm:justify-between flex-col sm:flex-row justify-start  m-auto  p-0 sm:p-[10%]'>
        <img className='object-contain h-auto sm:h-[80%]  w-[40%] ' src={`${product.image}`} alt="" />
    <div className='content w-auto sm:w-[50%] '>
        <h1 className='sm:text-4xl text-2xl'>{`${product.title}`}</h1>
        <h3 className='text-zinc-400 sm:my-5 my-1'>{`${product.category}`}</h3>
        <h2 className='text-red-300 sm:mb-3 mb-1' >$ {`${product.price}`}</h2>
        <p className='mb-[4%] w-full  text-sm'>{`${product.description}`}</p>
        <Link to={`/edit/${product.id}`} className='mr-5 py-2 px-5 border bordfer-blue-200 text-blue-200 rounded '>
          Edit
        </Link>

        <button onClick={() => productDeleteHandler(product.id)} className='py-2 px-5 border border-red-200 text-red-300 rounded '>
          Delete
        </button>
    </div>
    </div>
    ):( 
    <Loading/>
  )
}

export default Details